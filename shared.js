
(function(window){
  const BLOCKED_NAMES = ['Rmdan Ikaml','Ouchen abdellah','Salh biranzaran','Salh tegir','Youssef biranzaran','Ahmed','احمد','Ahb','Agsb','Aissa','Hafidi','Rmdan','Ouchen'];
  function isBlocked(name){ if(!name) return false; const lower=String(name).toLowerCase().trim(); return BLOCKED_NAMES.some(b=>lower.includes(b.toLowerCase())); }
  function getId(item){ if(!item) return null; return item.customerId || item.id || null; }
  function getRealBalance(c){ if(!c) return 0; if(typeof c.currentBalance!=='undefined' && c.currentBalance!==null && c.currentBalance!==''){ const cb=parseFloat(c.currentBalance); if(!isNaN(cb)) return cb; } let paid=0,received=0; if(c.operations && Array.isArray(c.operations)){ c.operations.forEach(op=>{ if(!op) return; const amt=Number(op.amount)||0; if(op.type==='paid') paid+=amt; else if(op.type==='received') received+=amt; }); } const base=parseFloat(c.amount); const baseVal=isNaN(base)?0:base; return baseVal+paid-received; }
  function isDueToday(customer){ if(!customer) return false; if(isBlocked(customer.name)) return false; const balance=getRealBalance(customer); if(balance<=0) return false; const today=new Date().toISOString().split('T')[0]; let date=customer.date; if(!date) return true; date=String(date).trim(); if(!date) return true; if(date===today) return true; if(date<today) return true; return false; }
  function buildWhatsAppConfirmMessage(customerName, receivedAmount, remainingTotal){ return `✅ إشعار استلام دفعة\n\nالسلام عليكم ${customerName}\n\nتم تسجيل استلام مبلغ قدره:\n\n💵 ${receivedAmount} درهم\n\n📌 المبلغ المتبقي الواجب أداؤه:\n${remainingTotal}\n\n🙏 شكراً لكم على حسن تعاونكم.\n\n📖 karni pro`; }
  function sendWhatsApp(phone, message){ if(!phone) return false; const clean=String(phone).replace(/\D/g,''); if(!clean) return false; const num=clean.startsWith('0')?'212'+clean.substring(1):(clean.startsWith('212')?clean:'212'+clean); window.open('https://wa.me/'+num+'?text='+encodeURIComponent(message),'_blank'); return true; }
  window.KarniShared={BLOCKED_NAMES,isBlocked,getId,getRealBalance,isDueToday,isDueTodayFromIndex:isDueToday,buildWhatsAppConfirmMessage,sendWhatsApp};
})(window);
