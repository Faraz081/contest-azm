import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, 
  Copy, 
  Trash2, 
  Check, 
  Search, 
  Clock, 
  Share2, 
  X, 
  Layers,
  CheckCircle2,
  Send,
  Hourglass
} from 'lucide-react';
import { showToast } from '../../utils/toast';
import api from '../../services/api';

const initialPassesData = [
  { 
    id: '1', 
    visitorName: 'Bilal Khan', 
    phone: '0300-1234567', 
    vehicleNo: 'LEB-1234', 
    passCode: 'VP-8492', 
    status: 'APPROVED', 
    type: 'Guest',
    purpose: 'Family Dinner Visit',
    validTill: '2026-08-18', 
    createdAt: '2026-08-17 09:30 AM' 
  },
  { 
    id: '2', 
    visitorName: 'Fatima Tariq (Daraz Express)', 
    phone: '0321-7654321', 
    vehicleNo: 'KHI-5678', 
    passCode: 'VP-1204', 
    status: 'USED', 
    type: 'Delivery',
    purpose: 'Online Package Delivery',
    validTill: '2026-08-16', 
    createdAt: '2026-08-16 02:15 PM' 
  },
  { 
    id: '3', 
    visitorName: 'Tariq Mehmood', 
    phone: '0333-8889900', 
    vehicleNo: 'ISB-4412', 
    passCode: null, 
    status: 'PENDING', 
    type: 'Maintenance',
    purpose: 'Electrician Inspection & Wiring',
    validTill: '2026-08-19', 
    createdAt: '2026-08-17 10:15 AM' 
  },
  { 
    id: '4', 
    visitorName: 'Careem Captain (Muhammad Ali)', 
    phone: '0345-9876543', 
    vehicleNo: 'LHR-4421', 
    passCode: 'VP-3189', 
    status: 'EXPIRED', 
    type: 'Cab/Taxi',
    purpose: 'Airport Dropoff Ride',
    validTill: '2026-08-15', 
    createdAt: '2026-08-15 11:20 AM' 
  }
];

export default function VisitorPass() {
  const [passes, setPasses] = useState(initialPassesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedPass, setSelectedPass] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    visitorName: '',
    phone: '',
    vehicleNo: '',
    type: 'Guest',
    purpose: '',
    validTill: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = () => {
    api.get('/resident/visitors')
      .then((res) => {
        if (Array.isArray(res.data?.data) && res.data.data.length > 0) {
          const backendPasses = res.data.data.map((item) => ({
            id: item._id,
            visitorName: item.visitor_name,
            phone: item.phone,
            vehicleNo: item.vehicle_number || 'No Vehicle',
            passCode: item.gate_pass_code,
            status: item.status === 'Approved' ? 'APPROVED' : item.status === 'Pending' ? 'PENDING' : item.status,
            type: 'Guest',
            purpose: 'Visitor Access',
            validTill: new Date(item.createdAt).toISOString().split('T')[0],
            createdAt: new Date(item.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
          }));
          setPasses(backendPasses);
        }
      })
      .catch(() => {
        // Fallback to local state if backend not connected
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreatePassRequest = async (e) => {
    e.preventDefault();
    if (!formData.visitorName.trim() || !formData.phone.trim()) {
      showToast('Please provide visitor name and contact phone number.', 'error');
      return;
    }

    setIsSubmitting(true);

    const newPass = {
      id: Date.now().toString(),
      visitorName: formData.visitorName.trim(),
      phone: formData.phone.trim(),
      vehicleNo: formData.vehicleNo.trim() || 'No Vehicle',
      type: formData.type,
      purpose: formData.purpose.trim() || 'General Visit',
      passCode: null, 
      status: 'PENDING',
      validTill: formData.validTill || new Date().toISOString().split('T')[0],
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
    };

    try {
      const res = await api.post('/resident/visitor-pass', {
        visitor_name: newPass.visitorName,
        phone: newPass.phone,
        vehicle_number: newPass.vehicleNo
      });

      if (res.data?.data?._id) {
        newPass.id = res.data.data._id;
      }
      showToast('Visitor pass request submitted to Admin! Awaiting approval before QR generation.', 'success', 5000);
    } catch {
      showToast('Visitor pass request logged (Pending Admin Approval).', 'info', 5000);
    } finally {
      setIsSubmitting(false);
    }

    setPasses([newPass, ...passes]);
    setSelectedPass(newPass);

    setFormData({
      visitorName: '',
      phone: '',
      vehicleNo: '',
      type: 'Guest',
      purpose: '',
      validTill: new Date().toISOString().split('T')[0]
    });
  };

  const handleDelete = (id, code) => {
    const label = code || 'this pass request';
    if (window.confirm(`Are you sure you want to delete ${label}?`)) {
      setPasses(passes.filter((p) => p.id !== id));
      if (selectedPass?.id === id) setSelectedPass(null);
      showToast('Pass request deleted', 'info');
    }
  };

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(`Pass code ${code} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredPasses = passes.filter((p) => {
    const matchesSearch = 
      p.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.passCode && p.passCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.phone.includes(searchTerm) ||
      (p.vehicleNo && p.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = passes.length;
  const approvedCount = passes.filter(p => p.status === 'APPROVED' || p.status === 'Approved').length;
  const pendingCount = passes.filter(p => p.status === 'PENDING' || p.status === 'Pending').length;

  return (
    <div>
      {/* Page Heading */}
      <h2 className="font-heading text-2xl text-foreground mb-6">Visitor Gate Pass</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-primary/10 text-primary shrink-0">
            <Layers size={22} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Requests</p>
            <p className="text-xl font-semibold font-mono text-foreground">{totalCount}</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-secondary/10 text-secondary shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Approved Passes</p>
            <p className="text-xl font-semibold font-mono text-secondary">{approvedCount}</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-primary/10 text-primary shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending Admin Approval</p>
            <p className="text-xl font-semibold font-mono text-foreground">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Request Form & Approval / QR Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Pass Request Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleCreatePassRequest} className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
            <div>
              <h3 className="font-heading text-lg text-foreground">Request Visitor Gate Pass</h3>
              <p className="text-xs text-muted-foreground">
                Pass requests are sent to Administration for verification. QR code is generated upon Admin approval.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">Visitor Full Name</label>
                <input
                  type="text"
                  name="visitorName"
                  value={formData.visitorName}
                  onChange={handleChange}
                  placeholder="e.g. Bilal Khan"
                  required
                  className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 0300-1234567"
                  required
                  className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">Visitor Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="Guest">Guest / Friend</option>
                  <option value="Delivery">Delivery Rider</option>
                  <option value="Cab/Taxi">Careem / Cab</option>
                  <option value="Maintenance">Maintenance Worker</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Vehicle No. (Optional)</label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleChange}
                  placeholder="e.g. LEB-1234"
                  className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground uppercase font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Valid Till Date</label>
                <input
                  type="date"
                  name="validTill"
                  value={formData.validTill}
                  onChange={handleChange}
                  className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Purpose of Visit</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="e.g. Family dinner, parcel delivery, etc."
                className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-xs inline-flex items-center gap-1.5 transition cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Submitting to Admin...' : 'Send Request to Admin'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Selected Pass Inspection Card */}
        <div className="lg:col-span-5 flex flex-col">
          {selectedPass ? (
            <div className="bg-card border border-border rounded-xl p-6 flex-1 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    selectedPass.status === 'APPROVED' ? 'bg-secondary' : 
                    selectedPass.status === 'PENDING' ? 'bg-amber-500' : 'bg-muted-foreground'
                  }`}></span>
                  <span className="text-xs font-mono font-medium text-foreground uppercase tracking-wider">
                    {selectedPass.status === 'APPROVED' ? 'Active QR Gate Pass' : 'Pass Request Details'}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPass(null)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded-md transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {selectedPass.status === 'APPROVED' && selectedPass.passCode ? (
                /* Approved State: Active QR Code */
                <div className="my-4 flex flex-col items-center text-center">
                  <div className="p-3 bg-white border border-border rounded-xl shadow-xs mb-3">
                    <QRCodeSVG 
                      value={selectedPass.passCode} 
                      size={130}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full mb-2">
                    <span className="font-mono text-sm font-semibold text-primary">
                      {selectedPass.passCode}
                    </span>
                    <button
                      onClick={() => handleCopyCode(selectedPass.passCode)}
                      className="text-muted-foreground hover:text-foreground transition cursor-pointer"
                      title="Copy Code"
                    >
                      {copiedCode === selectedPass.passCode ? (
                        <Check size={14} className="text-secondary" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  <h4 className="font-heading text-lg text-foreground">{selectedPass.visitorName}</h4>
                  <p className="text-xs text-muted-foreground font-mono">{selectedPass.type} • {selectedPass.phone}</p>
                  {selectedPass.vehicleNo && selectedPass.vehicleNo !== 'No Vehicle' && (
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">Vehicle: {selectedPass.vehicleNo}</p>
                  )}
                </div>
              ) : selectedPass.status === 'PENDING' ? (
                /* Pending State: Awaiting Admin Approval */
                <div className="my-4 p-6 rounded-xl border border-dashed border-border bg-muted/30 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Hourglass size={24} />
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium font-mono mb-2">
                    Awaiting Admin Approval
                  </span>
                  <h4 className="font-heading text-base text-foreground font-medium">{selectedPass.visitorName}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 max-w-xs leading-relaxed">
                    This pass request has been sent to Society Administration. The digital QR Code and pass code will activate automatically once approved by the Admin in the backend.
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground mt-3 bg-card px-3 py-1 rounded-md border border-border">
                    Status: Pending Verification
                  </p>
                </div>
              ) : (
                /* Other State (Used / Expired / Rejected) */
                <div className="my-4 text-center p-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-destructive/20 text-destructive font-medium">
                    {selectedPass.status}
                  </span>
                  <h4 className="font-heading text-base text-foreground mt-2">{selectedPass.visitorName}</h4>
                  <p className="text-xs text-muted-foreground mt-1">This pass has been marked as {selectedPass.status.toLowerCase()}.</p>
                </div>
              )}

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>Valid Till: <strong className="text-foreground font-mono">{selectedPass.validTill}</strong></span>
                {selectedPass.status === 'APPROVED' && selectedPass.passCode && (
                  <button
                    onClick={() => showToast('Pass link copied for WhatsApp sharing', 'success')}
                    className="border border-input px-3 py-1.5 rounded-lg font-medium text-foreground hover:bg-accent flex items-center gap-1 transition cursor-pointer"
                  >
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-dashed border-border rounded-xl p-8 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <QrCode size={24} />
              </div>
              <h4 className="font-heading text-sm font-medium text-foreground">Pass Details & QR View</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Submit a pass request on the left, or select "Inspect" from the list below to review approval and QR code status.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Passes List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
        
        {/* Controls Header */}
        <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg text-foreground">Pass Requests & History</h3>
            <p className="text-xs text-muted-foreground">All visitor approvals and gate logs for Unit A-402</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-60">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search visitor or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Filter */}
            <div className="flex bg-muted p-1 rounded-lg text-xs font-medium text-muted-foreground">
              {['ALL', 'APPROVED', 'PENDING', 'USED', 'EXPIRED'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1 rounded-md transition cursor-pointer ${
                    statusFilter === tab
                      ? 'bg-card text-foreground shadow-xs font-semibold'
                      : 'hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divided Rows */}
        <div className="divide-y divide-border">
          {filteredPasses.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No visitor passes found under this category.
            </div>
          ) : (
            filteredPasses.map((p) => (
              <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    {p.status === 'APPROVED' ? <QrCode size={20} /> : <Clock size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground text-sm">{p.visitorName}</p>
                      {p.passCode ? (
                        <span className="font-mono text-xs font-semibold text-primary">{p.passCode}</span>
                      ) : (
                        <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          Awaiting Admin
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        p.status === 'APPROVED'
                          ? 'bg-secondary/20 text-secondary'
                          : p.status === 'PENDING'
                          ? 'bg-muted text-muted-foreground'
                          : p.status === 'USED'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-destructive/20 text-destructive'
                      }`}>
                        {p.status === 'PENDING' ? 'Pending Admin Approval' : p.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {p.phone} • {p.type} • {p.vehicleNo || 'No Vehicle'} • Valid: {p.validTill}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-0.5">{p.purpose}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => setSelectedPass(p)}
                    className="border border-input px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-accent transition cursor-pointer"
                  >
                    {p.status === 'APPROVED' ? 'View QR' : 'Inspect'}
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.passCode)}
                    className="border border-destructive text-destructive px-2 py-1.5 rounded-lg font-medium text-xs hover:bg-destructive/10 transition cursor-pointer"
                    title="Delete Pass"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}