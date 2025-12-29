import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Settings, Cpu, Zap, Sliders, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ModelPage: React.FC = () => {
  const { modelSettings, updateModelSettings } = useTransactions();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="text-primary-600" />
            AI Model Configuration
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
            Fine-tune the behavior of the financial anomaly detection engine.
        </p>
      </div>

      {/* Model Selection */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Active Model
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['FinBERT-v2', 'Anomaly-G3', 'Risk-X1'].map((model) => (
                <button
                    key={model}
                    onClick={() => updateModelSettings({ activeModel: model as any })}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        modelSettings.activeModel === model
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                >
                    <div className="font-bold text-slate-900 dark:text-white">{model}</div>
                    <div className="text-xs text-slate-500 mt-1">
                        {model === 'FinBERT-v2' ? 'Best for Categorization' : 
                         model === 'Anomaly-G3' ? 'Best for Fraud Detection' : 'Balanced Hybrid Model'}
                    </div>
                    {modelSettings.activeModel === model && (
                        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary-500"></div>
                    )}
                </button>
            ))}
        </div>
      </div>

      {/* Thresholds */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
         <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-500" />
            Parameters & Thresholds
        </h3>
        
        <div className="space-y-8">
            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Detection Sensitivity</label>
                    <span className="text-sm font-mono text-primary-600 dark:text-primary-400">{modelSettings.sensitivity}%</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={modelSettings.sensitivity}
                    onChange={(e) => updateModelSettings({ sensitivity: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <p className="text-xs text-slate-500 mt-1">Higher sensitivity flags more transactions as risks but may increase false positives.</p>
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Auto-Flag Threshold</label>
                    <span className="text-sm font-mono text-primary-600 dark:text-primary-400">{modelSettings.autoFlagThreshold}%</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={modelSettings.autoFlagThreshold}
                    onChange={(e) => updateModelSettings({ autoFlagThreshold: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <p className="text-xs text-slate-500 mt-1">Transactions with a confidence score below this value are automatically flagged for human review.</p>
            </div>
            
            <div className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Real-time Analysis</div>
                    <div className="text-xs text-slate-500">Process transactions as they arrive in the stream</div>
                </div>
                <button 
                    onClick={() => updateModelSettings({ realtimeAnalysis: !modelSettings.realtimeAnalysis })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${modelSettings.realtimeAnalysis ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${modelSettings.realtimeAnalysis ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
        </div>
      </div>

      <div className="flex justify-end">
          <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
          </Button>
      </div>
    </div>
  );
};