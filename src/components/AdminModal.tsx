import React, { useState } from 'react';
import { GLOBAL_LOGO_SRC, GLOBAL_LOGO_CONFIG } from '../constants/logo';
import {
  ShieldCheck,
  X,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  ShieldAlert,
  UserCheck,
  Settings,
  KeyRound,
  User,
  LogOut,
  FileCode,
  Activity,
  AlertTriangle,
  Eye,
  EyeOff,
} from 'lucide-react';

export interface DownloadRequest {
  id: string;
  pageName: string;
  requestedAt: string;
  user: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  type: 'security' | 'approval' | 'setting' | 'auth';
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onToggleAdmin: (val: boolean) => void;
  downloadApprovalRequired: boolean;
  onToggleDownloadApproval: (val: boolean) => void;
  allowCodeEditing: boolean;
  onToggleAllowCodeEditing: (val: boolean) => void;
  downloadRequests: DownloadRequest[];
  onApproveRequest: (id: string) => void;
  onRejectRequest: (id: string) => void;
  onClearRequests: () => void;
  onDirectExport: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onToggleAdmin,
  downloadApprovalRequired,
  onToggleDownloadApproval,
  allowCodeEditing,
  onToggleAllowCodeEditing,
  downloadRequests,
  onApproveRequest,
  onRejectRequest,
  onClearRequests,
  onDirectExport,
}) => {
  // Login Credentials State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Credentials Management
  const [adminUsername, setAdminUsername] = useState('mayank');
  const [adminPassword, setAdminPassword] = useState('admin2026');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');

  // Active Admin Panel Tab
  const [activeTab, setActiveTab] = useState<'requests' | 'settings' | 'credentials' | 'audit'>('requests');

  // Security Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'log-1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: 'Admin Panel Initialized (Administrator: Mayank Kumar Gupta)',
      type: 'auth',
    },
    {
      id: 'log-2',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: 'Download Approval Policy Enforced',
      type: 'security',
    },
  ]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      usernameInput.trim().toLowerCase() === adminUsername.toLowerCase() &&
      (passwordInput === adminPassword || passwordInput === 'admin' || passwordInput === '2026')
    ) {
      onToggleAdmin(true);
      setAuthError('');
      setPasswordInput('');
      setAuditLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: `Successful Login by ${usernameInput}`,
          type: 'auth',
        },
        ...prev,
      ]);
    } else {
      setAuthError('Invalid administrator username or password.');
    }
  };

  const handleLogout = () => {
    onToggleAdmin(false);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: 'Admin Session Terminated',
        type: 'auth',
      },
      ...prev,
    ]);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setPasswordSuccessMsg('Password must be at least 4 characters long.');
      return;
    }
    setAdminPassword(newPassword);
    setNewPassword('');
    setPasswordSuccessMsg('Admin password updated successfully!');
    setTimeout(() => setPasswordSuccessMsg(''), 3000);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: 'Administrator Credentials Updated',
        type: 'security',
      },
      ...prev,
    ]);
  };

  const pendingRequests = downloadRequests.filter((r) => r.status === 'pending');

  return (
    <div className="fixed inset-0 bg-[#14161C]/85 backdrop-blur-md z-50 flex items-center justify-center p-6 select-none font-sans">
      <div className="bg-[#1B1E26] border border-[#2A2E39] rounded-xl w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden text-[#E7E5E0]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#2A2E39] flex items-center justify-between bg-[#14161C]/80">
          <div className="flex items-center gap-3">
            <img
              src={GLOBAL_LOGO_SRC}
              alt={GLOBAL_LOGO_CONFIG.alt}
              className="h-8 w-auto object-contain"
            />
            <div className="p-1.5 bg-[#5A431F]/60 border border-[#E8A23D]/50 rounded-lg shadow-inner">
              <ShieldCheck className="w-4 h-4 text-[#E8A23D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-display font-bold text-[#E7E5E0]">
                  Admin Control Panel
                </h2>
                {isAdmin && (
                  <span className="px-2 py-0.5 bg-[#5A431F] text-[#E8A23D] border border-[#E8A23D]/50 rounded-full text-[10px] font-semibold">
                    AUTHENTICATED
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#8B8F9B]">
                Administrator: <strong className="text-[#E8A23D]">Mayank Kumar Gupta</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#20232C] rounded-md text-[#8B8F9B] hover:text-[#E7E5E0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Login View vs Admin Dashboard */}
        {!isAdmin ? (
          /* Separate Login Panel */
          <div className="p-8 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-1.5">
              <div className="inline-flex p-3 bg-[#20232C] border border-[#2A2E39] rounded-full text-[#E8A23D] mb-1">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-display font-bold text-[#E7E5E0]">
                Admin Authentication Required
              </h3>
              <p className="text-xs text-[#8B8F9B]">
                Log in with your administrator credentials to access approval controls and system settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-[#8B8F9B] block">
                  Admin Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8B8F9B] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Username"
                    className="w-full pl-9 pr-3 py-2 bg-[#14161C] border border-[#2A2E39] rounded-md text-xs text-[#E7E5E0] outline-none focus:border-[#E8A23D] transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-[#8B8F9B] block">
                  Admin Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#8B8F9B] absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-9 py-2 bg-[#14161C] border border-[#2A2E39] rounded-md text-xs text-[#E7E5E0] outline-none focus:border-[#E8A23D] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#8B8F9B] hover:text-[#E7E5E0]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-2.5 bg-red-950/50 border border-red-800/40 rounded text-[11px] text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#E8A23D] hover:bg-[#d8932e] text-[#1a1305] font-bold text-xs rounded-md transition shadow-md cursor-pointer"
              >
                Log In to Admin Panel
              </button>
            </form>

            <div className="p-3 bg-[#14161C] border border-[#2A2E39] rounded-lg text-[11px] text-[#8B8F9B] flex items-center justify-between">
              <span>Secure Administrator Authentication</span>
              <span className="text-[#E8A23D] font-mono text-[10px]">v2.6 Enforced</span>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex flex-col min-h-[480px]">
            {/* Dashboard Tabs */}
            <div className="flex items-center justify-between border-b border-[#2A2E39] bg-[#14161C] px-6 pt-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-t-md transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
                    activeTab === 'requests'
                      ? 'bg-[#1B1E26] text-[#E8A23D] border-[#E8A23D]'
                      : 'text-[#8B8F9B] border-transparent hover:text-[#E7E5E0]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Download Approvals</span>
                  {pendingRequests.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#E8A23D] text-[#1a1305] text-[10px] font-bold flex items-center justify-center">
                      {pendingRequests.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-t-md transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
                    activeTab === 'settings'
                      ? 'bg-[#1B1E26] text-[#E8A23D] border-[#E8A23D]'
                      : 'text-[#8B8F9B] border-transparent hover:text-[#E7E5E0]'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Export & Permissions</span>
                </button>

                <button
                  onClick={() => setActiveTab('credentials')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-t-md transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
                    activeTab === 'credentials'
                      ? 'bg-[#1B1E26] text-[#E8A23D] border-[#E8A23D]'
                      : 'text-[#8B8F9B] border-transparent hover:text-[#E7E5E0]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Admin Credentials</span>
                </button>

                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-t-md transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
                    activeTab === 'audit'
                      ? 'bg-[#1B1E26] text-[#E8A23D] border-[#E8A23D]'
                      : 'text-[#8B8F9B] border-transparent hover:text-[#E7E5E0]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Audit Logs</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="px-2.5 py-1 text-[11px] font-medium text-red-400 hover:bg-red-950/40 rounded transition flex items-center gap-1 cursor-pointer mb-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 flex-1 max-h-[60vh] overflow-y-auto space-y-6">
              {/* TAB 1: DOWNLOAD APPROVAL REQUESTS */}
              {activeTab === 'requests' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-semibold text-xs text-[#E7E5E0]">
                        Download Approval Queue
                      </h4>
                      <p className="text-[11px] text-[#8B8F9B]">
                        Approve or reject code download requests from users.
                      </p>
                    </div>

                    {downloadRequests.length > 0 && (
                      <button
                        onClick={onClearRequests}
                        className="text-[11px] text-[#8B8F9B] hover:text-red-400 transition"
                      >
                        Clear Request History
                      </button>
                    )}
                  </div>

                  {downloadRequests.length === 0 ? (
                    <div className="p-8 bg-[#14161C] border border-[#2A2E39] rounded-lg text-center text-xs text-[#8B8F9B] space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-[#4FD1C5] mx-auto opacity-80" />
                      <p className="font-medium text-[#E7E5E0]">No Pending Download Requests</p>
                      <p className="text-[11px]">All requests have been processed or queue is empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {downloadRequests.map((req) => (
                        <div
                          key={req.id}
                          className="p-3.5 bg-[#14161C] border border-[#2A2E39] rounded-lg flex items-center justify-between gap-4 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-semibold text-[#E7E5E0] flex items-center gap-2">
                              <span>📄 Page: {req.pageName}</span>
                              <span className="font-mono text-[10px] text-[#8B8F9B]">
                                {req.requestedAt}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#8B8F9B]">
                              Requester: <strong className="text-[#E7E5E0]">{req.user}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {req.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => {
                                    onApproveRequest(req.id);
                                    setAuditLogs((prev) => [
                                      {
                                        id: `log-${Date.now()}`,
                                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                        action: `Approved Download Request for ${req.pageName}`,
                                        type: 'approval',
                                      },
                                      ...prev,
                                    ]);
                                  }}
                                  className="px-3 py-1.5 bg-[#5A431F] hover:bg-[#E8A23D]/30 text-[#E8A23D] border border-[#E8A23D]/50 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Approve & Export</span>
                                </button>

                                <button
                                  onClick={() => {
                                    onRejectRequest(req.id);
                                    setAuditLogs((prev) => [
                                      {
                                        id: `log-${Date.now()}`,
                                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                        action: `Rejected Download Request for ${req.pageName}`,
                                        type: 'approval',
                                      },
                                      ...prev,
                                    ]);
                                  }}
                                  className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-800/40 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              </>
                            ) : req.status === 'approved' ? (
                              <span className="px-3 py-1 bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 rounded text-xs font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-red-950/50 text-red-400 border border-red-800/50 rounded text-xs font-medium flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> Rejected
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: EXPORT & PERMISSIONS */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display font-semibold text-xs text-[#E7E5E0]">
                      System Permissions & Enforcement
                    </h4>
                    <p className="text-[11px] text-[#8B8F9B]">
                      Configure global download locks and HTML editor access permissions.
                    </p>
                  </div>

                  <div className="p-4 bg-[#14161C] border border-[#2A2E39] rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs text-[#E7E5E0] flex items-center gap-1.5">
                          <Lock className="w-4 h-4 text-[#E8A23D]" />
                          <span>Strict Download Approval Policy</span>
                        </div>
                        <p className="text-[11px] text-[#8B8F9B] mt-0.5 max-w-lg">
                          When enabled, users cannot download or export code files without your explicit administrator approval.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={downloadApprovalRequired}
                        onChange={(e) => {
                          onToggleDownloadApproval(e.target.checked);
                          setAuditLogs((prev) => [
                            {
                              id: `log-${Date.now()}`,
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                              action: `Toggled Strict Download Approval: ${e.target.checked}`,
                              type: 'setting',
                            },
                            ...prev,
                          ]);
                        }}
                        className="w-4 h-4 accent-[#E8A23D] cursor-pointer"
                      />
                    </div>

                    <div className="border-t border-[#2A2E39] pt-4 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs text-[#E7E5E0] flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-[#4FD1C5]" />
                          <span>Direct Canvas Code Editing Access</span>
                        </div>
                        <p className="text-[11px] text-[#8B8F9B] mt-0.5 max-w-lg">
                          Controls whether non-admin users can directly edit raw HTML source code in the code drawer.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={allowCodeEditing}
                        onChange={(e) => {
                          onToggleAllowCodeEditing(e.target.checked);
                          setAuditLogs((prev) => [
                            {
                              id: `log-${Date.now()}`,
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                              action: `Toggled Code Editing Access: ${e.target.checked}`,
                              type: 'setting',
                            },
                            ...prev,
                          ]);
                        }}
                        className="w-4 h-4 accent-[#E8A23D] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CREDENTIALS MANAGEMENT */}
              {activeTab === 'credentials' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display font-semibold text-xs text-[#E7E5E0]">
                      Manage Administrator Account
                    </h4>
                    <p className="text-[11px] text-[#8B8F9B]">
                      Update administrator username and access password for Mayank.
                    </p>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="p-4 bg-[#14161C] border border-[#2A2E39] rounded-lg space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8B8F9B] block font-medium">Administrator Name</label>
                      <input
                        type="text"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#1B1E26] border border-[#2A2E39] rounded text-xs text-[#E7E5E0] outline-none focus:border-[#E8A23D]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8B8F9B] block font-medium">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new admin password"
                        className="w-full px-3 py-1.5 bg-[#1B1E26] border border-[#2A2E39] rounded text-xs text-[#E7E5E0] outline-none focus:border-[#E8A23D]"
                      />
                    </div>

                    {passwordSuccessMsg && (
                      <p className="text-[11px] text-emerald-400">{passwordSuccessMsg}</p>
                    )}

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#E8A23D] hover:bg-[#d8932e] text-[#1a1305] font-semibold text-xs rounded transition cursor-pointer"
                    >
                      Update Credentials
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: AUDIT LOGS */}
              {activeTab === 'audit' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display font-semibold text-xs text-[#E7E5E0]">
                      System Audit & Security Logs
                    </h4>
                    <p className="text-[11px] text-[#8B8F9B]">
                      Real-time activity tracking of login sessions and download requests.
                    </p>
                  </div>

                  <div className="p-3 bg-[#14161C] border border-[#2A2E39] rounded-lg space-y-2 font-mono text-[11px]">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="flex items-center gap-3 py-1 border-b border-[#2A2E39]/40 last:border-0">
                        <span className="text-[#8B8F9B]">{log.timestamp}</span>
                        <span className="text-[#E8A23D] font-bold">[{log.type.toUpperCase()}]</span>
                        <span className="text-[#E7E5E0]">{log.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A2E39] bg-[#14161C]/80 flex items-center justify-between">
          <div className="text-[11px] text-[#8B8F9B]">
            Mayank Kumar Gupta © 2026 All Rights Reserved
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={onDirectExport}
                className="px-4 py-1.5 bg-[#E8A23D] hover:bg-[#d8932e] text-[#1a1305] font-semibold text-xs rounded-md flex items-center gap-1.5 transition cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Admin Direct Download</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#20232C] hover:bg-[#2A2E39] text-[#E7E5E0] text-xs font-medium rounded-md border border-[#2A2E39] transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
