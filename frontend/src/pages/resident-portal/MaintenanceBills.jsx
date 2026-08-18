import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  ShieldCheck, 
  X, 
  Receipt,
  Building2,
  Smartphone
} from 'lucide-react';
import { showToast } from '../../utils/toast';

const fallbackBills = [
  { 
    _id: '1', 
    invoiceNo: 'INV-2026-08', 
    title: 'Monthly Maintenance & Sinking Fund', 
    month: 'August 2026', 
    amount: '5,000', 
    dueDate: '2026-08-30', 
    status: 'Unpaid',
    breakdown: { baseMaintenance: '3,800', waterCharges: '700', sinkingFund: '500' }
  },
  { 
    _id: '2', 
    invoiceNo: 'INV-2026-07', 
    title: 'Monthly Maintenance & Security Dues', 
    month: 'July 2026', 
    amount: '5,000', 
    dueDate: '2026-07-30', 
    status: 'Paid',
    paidOn: '2026-07-28',
    transactionId: 'TXN-987214981',
    breakdown: { baseMaintenance: '3,800', waterCharges: '700', sinkingFund: '500' }
  },
  { 
    _id: '3', 
    invoiceNo: 'INV-2026-06', 
    title: 'Clubhouse & Gymnasium Annual Dues', 
    month: 'June 2026', 
    amount: '2,500', 
    dueDate: '2026-06-25', 
    status: 'Paid',
    paidOn: '2026-06-20',
    transactionId: 'TXN-554190823',
    breakdown: { baseMaintenance: '2,000', waterCharges: '0', sinkingFund: '500' }
  }
];

export default function MaintenanceBills() {
  const [bills, setBills] = useState(fallbackBills);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [payingBill, setPayingBill] = useState(null);
  const [viewingReceipt, setViewingReceipt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('jazzcash');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    api.get('/resident/bills')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBills(res.data);
        }
      })
      .catch(() => {
        // Use fallback bills
      });
  }, []);

  const handlePayBill = (bill) => {
    setPayingBill(bill);
  };

  const processPayment = (e) => {
    e.preventDefault();
    if (!payingBill) return;

    setIsProcessing(true);

    setTimeout(() => {
      const updatedBills = bills.map((b) => {
        if (b._id === payingBill._id) {
          return {
            ...b,
            status: 'Paid',
            paidOn: new Date().toISOString().split('T')[0],
            transactionId: `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`
          };
        }
        return b;
      });

      setBills(updatedBills);
      setIsProcessing(false);
      const paidItem = updatedBills.find((b) => b._id === payingBill._id);
      setPayingBill(null);
      setViewingReceipt(paidItem);
      showToast(`Payment of Rs. ${paidItem.amount} for ${paidItem.invoiceNo} successful!`, 'success');
    }, 1200);
  };

  const filteredBills = bills.filter((b) => {
    if (activeFilter === 'ALL') return true;
    return b.status === activeFilter;
  });

  const totalOutstanding = bills
    .filter((b) => b.status === 'Unpaid')
    .reduce((acc, curr) => acc + parseInt(curr.amount.replace(/,/g, '') || 0, 10), 0);

  const totalPaid = bills
    .filter((b) => b.status === 'Paid')
    .reduce((acc, curr) => acc + parseInt(curr.amount.replace(/,/g, '') || 0, 10), 0);

  return (
    <div>
      {/* Page Heading */}
      <h2 className="font-heading text-2xl text-foreground mb-6">Maintenance & Invoices</h2>
      
      {/* Financial Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-destructive/10 text-destructive shrink-0">
            <AlertCircle size={22} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Outstanding Dues</p>
            <p className="text-xl font-semibold font-mono text-destructive">
              Rs. {totalOutstanding.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-secondary/10 text-secondary shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Paid (YTD)</p>
            <p className="text-xl font-semibold font-mono text-secondary">
              Rs. {totalPaid.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-primary/10 text-primary shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Next Due Date</p>
            <p className="text-xl font-semibold font-mono text-foreground">30 Aug 2026</p>
          </div>
        </div>
      </div>

      {/* Invoices Divided List Container */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs mb-6">
        
        {/* Table Controls */}
        <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg text-foreground">Society Invoices</h3>
            <p className="text-xs text-muted-foreground">Statement of accounts for Palm Grove Residency, Unit A-402</p>
          </div>

          <div className="flex bg-muted p-1 rounded-lg text-xs font-medium text-muted-foreground">
            {['ALL', 'Unpaid', 'Paid'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-card text-foreground shadow-xs font-semibold'
                    : 'hover:text-foreground'
                }`}
              >
                {filter === 'ALL' ? 'All Invoices' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Divided List Rows */}
        <div className="divide-y divide-border">
          {filteredBills.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No bills found under this category.
            </div>
          ) : (
            filteredBills.map((bill) => (
              <div key={bill._id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Receipt size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground text-sm">{bill.title}</p>
                      <span className="font-mono text-xs font-semibold text-muted-foreground">{bill.invoiceNo}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        bill.status === 'Paid'
                          ? 'bg-secondary/20 text-secondary'
                          : 'bg-destructive/20 text-destructive'
                      }`}>
                        {bill.status === 'Paid' ? 'Paid' : 'Due / Unpaid'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Period: {bill.month} • Due Date: <span className="font-mono">{bill.dueDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 self-stretch sm:self-center">
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold font-mono text-foreground">Rs. {bill.amount}</p>
                    <p className="text-[11px] text-muted-foreground">PKR</p>
                  </div>

                  {bill.status === 'Paid' ? (
                    <button
                      onClick={() => setViewingReceipt(bill)}
                      className="border border-input px-3 py-1.5 rounded-lg text-foreground hover:bg-accent text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Receipt size={14} />
                      <span>Receipt</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayBill(bill)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-xs inline-flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                    >
                      <CreditCard size={14} />
                      <span>Pay Online</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Online Payment Modal */}
      {payingBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-xl text-foreground">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-primary" />
                <h3 className="font-heading text-lg text-foreground">Pay Maintenance Bill</h3>
              </div>
              <button
                onClick={() => setPayingBill(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Bill Info */}
            <div className="my-4 p-4 rounded-lg bg-muted/60 border border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{payingBill.title}</p>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">{payingBill.invoiceNo}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold font-mono text-primary">Rs. {payingBill.amount}</span>
                <p className="text-[10px] text-muted-foreground">PKR</p>
              </div>
            </div>

            {/* Payment Method Selector (Pakistani Gateways) */}
            <div className="space-y-3 mb-5">
              <label className="text-xs text-muted-foreground font-medium">Select Payment Gateway:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition cursor-pointer ${
                    paymentMethod === 'jazzcash'
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-input text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  <Smartphone size={16} />
                  <span>JazzCash / Raast</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition cursor-pointer ${
                    paymentMethod === 'easypaisa'
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-input text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  <Smartphone size={16} />
                  <span>EasyPaisa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-input text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  <Building2 size={16} />
                  <span>Online Bank</span>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={processPayment} className="flex flex-col gap-3">
              {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                <div>
                  <label className="text-sm text-muted-foreground">Mobile Account / Raast ID</label>
                  <input
                    type="text"
                    defaultValue="0300-1234567"
                    className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">An approval prompt will be sent to your mobile wallet app.</p>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div>
                  <label className="text-sm text-muted-foreground">Select Pakistani Bank</label>
                  <select className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option>Meezan Bank Limited</option>
                    <option>Habib Bank Limited (HBL)</option>
                    <option>Bank Alfalah</option>
                    <option>MCB Bank Limited</option>
                    <option>United Bank Limited (UBL)</option>
                    <option>Standard Chartered Pakistan</option>
                    <option>Faysal Bank</option>
                  </select>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Confirm & Pay Rs. {payingBill.amount}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Receipt Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-xl text-foreground">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-secondary" />
                <h3 className="font-heading text-lg text-foreground">Official Payment Receipt</h3>
              </div>
              <button
                onClick={() => setViewingReceipt(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-5 p-4 rounded-lg bg-muted/60 border border-border text-center">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary font-medium">
                Payment Completed
              </span>
              <h2 className="text-2xl font-semibold font-mono text-foreground mt-2">Rs. {viewingReceipt.amount}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{viewingReceipt.title}</p>
            </div>

            <div className="space-y-2 text-xs border-b border-border pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice Number</span>
                <span className="font-mono font-medium text-foreground">{viewingReceipt.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-foreground">{viewingReceipt.transactionId || 'TXN-884912903'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Date</span>
                <span className="text-foreground">{viewingReceipt.paidOn || 'Today'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit / Flat</span>
                <span className="text-foreground">Flat A-402, Palm Grove Residency, Karachi</span>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('Receipt PDF downloaded successfully', 'success');
                setViewingReceipt(null);
              }}
              className="w-full py-2.5 border border-input hover:bg-accent text-foreground text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download size={14} />
              <span>Download PDF Receipt</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}