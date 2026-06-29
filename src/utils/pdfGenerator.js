import { jsPDF } from 'jspdf';

export var gerarPDF = function(recipe) {
  var doc = new jsPDF({ unit: 'mm', format: 'a4' });
  var margin = 20;
  var y = margin;

  // Header bar
  doc.setFillColor(45, 26, 10);
  doc.rect(0, 0, 210, 18, 'F');
  doc.setTextColor(245, 224, 207);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('50 Receitas de Sabonetes Artesanais de Glicerina', margin, 12);
  y = 30;

  // Title
  doc.setTextColor(45, 26, 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(recipe.title || '', margin, y);
  y += 8;

  // Meta
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(122, 92, 72);
  var meta = (recipe.level || '') + '  ·  ' + (recipe.time || '') + '  ·  Rende ' + (recipe.yield || '') + '  ·  Custo: ' + (recipe.cost || '');
  doc.text(meta, margin, y);
  y += 6;

  // Profit
  doc.setTextColor(59, 109, 17);
  doc.text('Preco de venda sugerido: ' + (recipe.salePrice || '') + ' | Lucro: ' + (recipe.profitEstimate || ''), margin, y);
  y += 10;

  // Line
  doc.setDrawColor(234, 216, 196);
  doc.line(margin, y, 210 - margin, y);
  y += 8;

  // Description
  if (recipe.description) {
    doc.setTextColor(45, 26, 10);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    var descLines = doc.splitTextToSize(recipe.description, 170);
    doc.text(descLines, margin, y);
    y += descLines.length * 5 + 6;
  }

  // Ingredients
  doc.setTextColor(45, 26, 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Ingredientes', margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  var ingredients = recipe.ingredients || [];
  ingredients.forEach(function(ing) {
    var text = typeof ing === 'string' ? ing : ((ing.qty || '') + ' ' + (ing.name || ''));
    doc.text('  ' + text, margin, y);
    y += 5;
    if (y > 270) { doc.addPage(); y = margin; }
  });
  y += 4;

  // Materials
  if (recipe.materials && recipe.materials.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Materiais', margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    recipe.materials.forEach(function(m) {
      doc.text('  ' + m, margin, y);
      y += 5;
      if (y > 270) { doc.addPage(); y = margin; }
    });
    y += 4;
  }

  // Steps
  var steps = recipe.steps || recipe.preparation || [];
  if (steps.length > 0) {
    if (y > 240) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(45, 26, 10);
    doc.text('Modo de Preparo', margin, y);
    y += 7;

    steps.forEach(function(step, i) {
      if (y > 265) { doc.addPage(); y = margin; }
      var title = typeof step === 'string' ? '' : (step.title || '');
      var desc = typeof step === 'string' ? step : (step.desc || step.description || '');

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(184, 96, 30);
      doc.setFontSize(10);
      doc.text((i + 1) + '.', margin, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(45, 26, 10);
      var fullText = title ? (title + ': ' + desc) : desc;
      var lines = doc.splitTextToSize(fullText, 160);
      doc.text(lines, margin + 8, y);
      y += lines.length * 5 + 4;
    });
    y += 4;
  }

  // Tips
  var tips = recipe.tips || [];
  if (tips.length > 0) {
    if (y > 250) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(45, 26, 10);
    doc.text('Dicas', margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(122, 92, 72);
    tips.forEach(function(tip) {
      var t = typeof tip === 'string' ? tip : tip;
      var tl = doc.splitTextToSize('  ' + t, 170);
      doc.text(tl, margin, y);
      y += tl.length * 5 + 2;
      if (y > 270) { doc.addPage(); y = margin; }
    });
    y += 4;
  }

  // Packaging
  if (recipe.packaging) {
    if (y > 260) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(45, 26, 10);
    doc.text('Embalagem & Conservacao', margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(122, 92, 72);
    var pkgLines = doc.splitTextToSize(recipe.packaging, 170);
    doc.text(pkgLines, margin, y);
  }

  // Footer on all pages
  var totalPages = doc.internal.getNumberOfPages();
  for (var p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setTextColor(168, 128, 112);
    doc.text('50 Receitas de Sabonetes Artesanais de Glicerina', margin, 290);
    doc.text('Receita ' + recipe.id + ' de 50  |  Pagina ' + p + ' de ' + totalPages, 210 - margin, 290, { align: 'right' });
  }

  var filename = 'receita_' + recipe.id + '_' + (recipe.title || '').toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') + '.pdf';
  doc.save(filename);
};
