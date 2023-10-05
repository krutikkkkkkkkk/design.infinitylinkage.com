from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

def generate_invoice(client_name, items):
    pdf = SimpleDocTemplate("invoice.pdf", pagesize=letter)

    # Sample data: Item, Description, Cost
    data = [["Item", "Description", "Cost"]]
    data += items
    table = Table(data)

    # Add table style
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))

    pdf.build([table])

if __name__ == "__main__":
    client_name = "John Doe"
    items = [["Web Design", "Landing page", "$200"], ["Logo", "Company logo", "$100"]]
    generate_invoice(client_name, items)
