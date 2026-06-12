import React, { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, XCircle, Database, Lock, Key } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type Role = 'Finance' | 'Logistics' | 'Admin';
type Action = 'READ_FX' | 'UPDATE_LOGISTICS' | 'DROP_TABLES' | 'EDIT_FX';

export default function Bloc1GovernanceDemo() {
    const [selectedRole, setSelectedRole] = useState<Role>('Finance');
    const [actionLog, setActionLog] = useState<{ action: string; success: boolean; message: string; timestamp: Date }[]>([]);

    const attemptAction = (action: Action) => {
        let success = false;
        let message = '';
        let actionName = '';

        if (action === 'READ_FX') {
            actionName = 'View Financial Margin Risk';
            if (selectedRole === 'Finance' || selectedRole === 'Admin') {
                success = true;
                message = 'Success: Margin risk data retrieved successfully.';
            } else {
                success = false;
                message = 'Access Denied: Logistics role cannot view financial margins.';
            }
        } else if (action === 'UPDATE_LOGISTICS') {
            actionName = 'Update Shipping Schedules';
            if (selectedRole === 'Logistics' || selectedRole === 'Admin') {
                success = true;
                message = 'Success: Shipping transit schedules updated.';
            } else {
                success = false;
                message = 'Access Denied: Finance role cannot alter physical logistics.';
            }
        } else if (action === 'EDIT_FX') {
            actionName = 'Modify FX Exchange Rates';
            if (selectedRole === 'Admin') {
                success = true;
                 message = 'Success: System configuration applied to FX settings.';
            } else {
                success = false;
                message = 'Access Denied: Immutable data. Only Admins can modify raw schemas.';
            }
        } else if (action === 'DROP_TABLES') {
            actionName = 'Delete Database Tables';
            if (selectedRole === 'Admin') {
                success = true;
                message = 'Success: Database table forcefully dropped (Admin Privilege).';
            } else {
                success = false;
                message = 'Access Denied: Insufficient privileges to drop tables.';
            }
        }

        setActionLog(prev => [{ action: actionName, success, message, timestamp: new Date() }, ...prev].slice(0, 5));
    };

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl mb-12">
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Shield className="text-emerald-500" size={20} />
                    <h3 className="text-lg font-bold text-white">Interactive RBAC Simulator</h3>
                </div>
                <div className="text-xs text-slate-400">Zero-Trust Enterprise Policy</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Left Panel: Role Selection & Testing */}
                <div className="p-6 border-r border-slate-700 bg-slate-800/50">
                    <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">1. Assume User Role</h4>
                    <div className="flex gap-3 mb-8">
                        {(['Finance', 'Logistics', 'Admin'] as Role[]).map((role) => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                                className={cn(
                                    "flex-1 py-2 px-3 rounded-md text-sm font-medium border transition-all",
                                    selectedRole === role 
                                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" 
                                        : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                                )}
                            >
                                {role} 
                            </button>
                        ))}
                    </div>

                    <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">2. Attempt Database Operation</h4>
                    <div className="space-y-3">
                        <button onClick={() => attemptAction('READ_FX')} className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 transition-colors text-left group">
                            <div>
                                <div className="text-sm font-medium text-slate-200">Read Margin Data</div>
                                <div className="text-xs text-slate-500 font-mono mt-1">SELECT * FROM fact_margin_risk</div>
                            </div>
                            <Key size={16} className="text-slate-500 group-hover:text-blue-400" />
                        </button>

                        <button onClick={() => attemptAction('UPDATE_LOGISTICS')} className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 transition-colors text-left group">
                            <div>
                                <div className="text-sm font-medium text-slate-200">Update Logistics</div>
                                <div className="text-xs text-slate-500 font-mono mt-1">UPDATE dim_chromebook_vendor SET...</div>
                            </div>
                            <Key size={16} className="text-slate-500 group-hover:text-amber-400" />
                        </button>

                         <button onClick={() => attemptAction('EDIT_FX')} className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 transition-colors text-left group">
                            <div>
                                <div className="text-sm font-medium text-slate-200">Modify Immutable FX Rates</div>
                                <div className="text-xs text-slate-500 font-mono mt-1">UPDATE fact_margin_risk SET eur_to_usd...</div>
                            </div>
                            <Key size={16} className="text-slate-500 group-hover:text-rose-400" />
                        </button>

                        <button onClick={() => attemptAction('DROP_TABLES')} className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-red-900/50 transition-colors text-left group">
                            <div>
                                <div className="text-sm font-medium text-slate-200">Drop Database</div>
                                <div className="text-xs text-slate-500 font-mono mt-1">DROP TABLE fact_margin_risk;</div>
                            </div>
                            <ShieldAlert size={16} className="text-slate-500 group-hover:text-rose-500" />
                        </button>
                    </div>
                </div>

                {/* Right Panel: Audit Logging */}
                <div className="p-6 bg-slate-900 flex flex-col h-[400px]">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Live Audit Pipeline</h4>
                        <Database size={16} className="text-slate-500" />
                    </div>
                    
                    <div className="flex-1 overflow-auto space-y-3 pr-2">
                        {actionLog.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-3">
                                <Lock size={32} className="opacity-50" />
                                <span className="text-sm">Awaiting database queries...</span>
                            </div>
                        ) : (
                            actionLog.map((log, index) => (
                                <div key={index} className={cn(
                                    "p-3 rounded-lg border text-sm animate-in slide-in-from-right-4 duration-300",
                                    log.success 
                                        ? "bg-emerald-900/20 border-emerald-800/50" 
                                        : "bg-rose-900/20 border-rose-800/50"
                                )}>
                                    <div className="flex items-start gap-2">
                                        {log.success ? (
                                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                        ) : (
                                            <XCircle size={16} className="text-rose-500 mt-0.5 shrink-0" />
                                        )}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={cn(
                                                    "font-bold",
                                                    log.success ? "text-emerald-400" : "text-rose-400"
                                                )}>
                                                    {log.success ? 'GRANTED' : 'DENIED'}
                                                </span>
                                                <span className="text-slate-500 text-xs">
                                                    {log.timestamp.toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <p className="text-slate-300 font-medium mb-1">{log.action}</p>
                                            <p className="text-slate-400 text-xs">{log.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
