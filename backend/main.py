from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
from typing import Dict, Any, List
import json
from datetime import datetime
import io

app = FastAPI(
    title="AutoGenAI API",
    description="No-Code ML & Data Science Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global storage for uploaded datasets (in production, use database)
datasets = {}

@app.get("/")
async def root():
    return {"message": "AutoGenAI API - No-Code ML Platform"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload CSV/Excel file and auto-detect data types"""
    try:
        # Read file content
        content = await file.read()
        
        # Determine file type and read
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.StringIO(content.decode('utf-8')))
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
        # Generate dataset ID
        dataset_id = f"dataset_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Auto-detect data types and generate insights
        data_insights = analyze_dataset(df)
        
        # Store dataset
        datasets[dataset_id] = {
            "data": df.to_dict('records'),
            "columns": df.columns.tolist(),
            "shape": df.shape,
            "insights": data_insights,
            "uploaded_at": datetime.now().isoformat()
        }
        
        return {
            "dataset_id": dataset_id,
            "filename": file.filename,
            "shape": df.shape,
            "insights": data_insights
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/dataset/{dataset_id}")
async def get_dataset_info(dataset_id: str):
    """Get dataset information and insights"""
    if dataset_id not in datasets:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    return datasets[dataset_id]

@app.get("/dataset/{dataset_id}/eda")
async def get_eda_analysis(dataset_id: str):
    """Generate comprehensive EDA analysis"""
    if dataset_id not in datasets:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    df = pd.DataFrame(datasets[dataset_id]["data"])
    eda_results = generate_eda(df)
    
    return eda_results

@app.post("/query")
async def natural_language_query(dataset_id: str, query: str):
    """Process natural language queries using Gemini"""
    if dataset_id not in datasets:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    # TODO: Integrate with Google Gemini
    response = process_nl_query(dataset_id, query)
    return {"query": query, "response": response}

def analyze_dataset(df: pd.DataFrame) -> Dict[str, Any]:
    """Auto-detect data types and generate basic insights"""
    insights = {
        "data_types": {},
        "missing_values": {},
        "basic_stats": {},
        "correlations": {}
    }
    
    # Data type detection
    for col in df.columns:
        if df[col].dtype in ['int64', 'float64']:
            insights["data_types"][col] = "numerical"
        elif df[col].dtype == 'object':
            if df[col].nunique() < df[col].shape[0] * 0.5:
                insights["data_types"][col] = "categorical"
            else:
                insights["data_types"][col] = "text"
        elif df[col].dtype == 'datetime64[ns]':
            insights["data_types"][col] = "datetime"
    
    # Missing values
    missing_data = df.isnull().sum()
    insights["missing_values"] = missing_data[missing_data > 0].to_dict()
    
    # Basic statistics for numerical columns
    numerical_cols = df.select_dtypes(include=[np.number]).columns
    if len(numerical_cols) > 0:
        insights["basic_stats"] = df[numerical_cols].describe().to_dict()
    
    # Correlations for numerical columns
    if len(numerical_cols) > 1:
        correlations = df[numerical_cols].corr()
        insights["correlations"] = correlations.to_dict()
    
    return insights

def generate_eda(df: pd.DataFrame) -> Dict[str, Any]:
    """Generate comprehensive EDA analysis"""
    eda_results = {
        "summary": {},
        "distributions": {},
        "correlations": {},
        "outliers": {},
        "recommendations": []
    }
    
    # Summary statistics
    eda_results["summary"] = {
        "total_rows": len(df),
        "total_columns": len(df.columns),
        "missing_values": df.isnull().sum().sum(),
        "duplicate_rows": df.duplicated().sum()
    }
    
    # Column-wise analysis
    for col in df.columns:
        if df[col].dtype in ['int64', 'float64']:
            eda_results["distributions"][col] = {
                "mean": float(df[col].mean()),
                "median": float(df[col].median()),
                "std": float(df[col].std()),
                "min": float(df[col].min()),
                "max": float(df[col].max()),
                "skewness": float(df[col].skew())
            }
    
    # Generate recommendations
    recommendations = []
    if df.isnull().sum().sum() > 0:
        recommendations.append("Consider handling missing values")
    
    if df.duplicated().sum() > 0:
        recommendations.append("Remove duplicate rows")
    
    numerical_cols = df.select_dtypes(include=[np.number]).columns
    if len(numerical_cols) > 1:
        correlations = df[numerical_cols].corr()
        high_corr_pairs = []
        for i in range(len(correlations.columns)):
            for j in range(i+1, len(correlations.columns)):
                if abs(correlations.iloc[i, j]) > 0.8:
                    high_corr_pairs.append({
                        "col1": correlations.columns[i],
                        "col2": correlations.columns[j],
                        "correlation": float(correlations.iloc[i, j])
                    })
        
        if high_corr_pairs:
            recommendations.append("Consider removing highly correlated features")
            eda_results["correlations"]["high_correlations"] = high_corr_pairs
    
    eda_results["recommendations"] = recommendations
    
    return eda_results

def process_nl_query(dataset_id: str, query: str) -> str:
    """Process natural language queries (placeholder for Gemini integration)"""
    # TODO: Integrate with Google Gemini API
    return f"Processing query: '{query}' for dataset {dataset_id}. Gemini integration coming soon!"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 