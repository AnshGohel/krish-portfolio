import sys

def generate_pdf(filename):
    # A4 dimensions in points: 595.28 x 841.89
    width = 595.28
    height = 841.89
    
    stream_lines = []
    
    def set_font(font_name, size):
        stream_lines.append(f"/{font_name} {size} Tf")
        
    def draw_text(x, y, text, font="F1", size=10, r=0.1, g=0.1, b=0.1):
        # Escape parenthesis
        clean_text = text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
        stream_lines.append(f"{r:.2f} {g:.2f} {b:.2f} rg")
        stream_lines.append(f"/{font} {size} Tf")
        stream_lines.append(f"BT {x:.2f} {y:.2f} Td ({clean_text}) Tj ET")

    def draw_line(x1, y1, x2, y2, width=1, r=0.2, g=0.2, b=0.2):
        stream_lines.append(f"{r:.2f} {g:.2f} {b:.2f} RG")
        stream_lines.append(f"{width:.2f} w")
        stream_lines.append(f"{x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    # Header
    y = height - 50
    draw_text(width/2 - 130, y, "MAKWANA KRRISH", font="F2", size=22, r=0.06, g=0.09, b=0.16)
    
    y -= 20
    draw_text(width/2 - 80, y, "ELECTRICAL ENGINEER", font="F2", size=12, r=0.01, g=0.52, b=0.78)
    
    y -= 16
    contact_str = "Wankaner, Morbi, Gujarat, India   |   +91 9409000682   |   krrishmakwanad@gmail.com"
    draw_text(width/2 - 195, y, contact_str, font="F1", size=9, r=0.3, g=0.35, b=0.4)
    
    y -= 12
    draw_line(45, y, width - 45, y, width=1.8, r=0.06, g=0.09, b=0.16)
    
    # Profile Summary
    y -= 22
    draw_text(45, y, "PROFILE SUMMARY", font="F2", size=11, r=0.06, g=0.09, b=0.16)
    y -= 3
    draw_line(45, y, width - 45, y, width=0.8, r=0.8, g=0.83, b=0.88)
    
    y -= 14
    summary_lines = [
        "Motivated Electrical Engineering student with internship experience in a CNC company. Interested in",
        "solar energy, renewable energy, and electric vehicle technologies. Possesses strong technical, problem-",
        "solving, and teamwork skills. Fluent in Hindi, English, and Gujarati, with a willingness to learn and",
        "grow in the engineering field."
    ]
    for line in summary_lines:
        draw_text(45, y, line, font="F1", size=9.5, r=0.2, g=0.25, b=0.3)
        y -= 13

    # Experience
    y -= 10
    draw_text(45, y, "EXPERIENCE", font="F2", size=11, r=0.06, g=0.09, b=0.16)
    y -= 3
    draw_line(45, y, width - 45, y, width=0.8, r=0.8, g=0.83, b=0.88)
    
    y -= 15
    draw_text(45, y, "Electrical Engineering Intern", font="F2", size=10.5, r=0.06, g=0.09, b=0.16)
    draw_text(width - 240, y, "CNC Manufacturing Company", font="F2", size=10.5, r=0.01, g=0.52, b=0.78)
    
    y -= 12
    draw_text(45, y, "Practical Industrial Exposure & Machinery Maintenance", font="F1", size=8.5, r=0.45, g=0.5, b=0.55)
    
    exp_bullets = [
        "Gained hands-on experience in CNC machine operations and manufacturing processes.",
        "Assisted in machine setup, operation, and routine maintenance activities.",
        "Learned industrial safety standards and workplace procedures.",
        "Observed production planning and quality control processes.",
        "Supported troubleshooting and basic technical tasks in the production environment.",
        "Developed problem-solving and analytical skills through practical exposure.",
        "Worked effectively with technicians and team members to achieve production targets."
    ]
    y -= 14
    for bullet in exp_bullets:
        draw_text(48, y, "*", font="F2", size=9, r=0.01, g=0.52, b=0.78)
        draw_text(58, y, bullet, font="F1", size=9.2, r=0.2, g=0.25, b=0.3)
        y -= 13.5

    # Education
    y -= 8
    draw_text(45, y, "EDUCATION", font="F2", size=11, r=0.06, g=0.09, b=0.16)
    y -= 3
    draw_line(45, y, width - 45, y, width=0.8, r=0.8, g=0.83, b=0.88)
    
    y -= 15
    draw_text(45, y, "Bachelor of Engineering (B.E.) - Electrical Engineering", font="F2", size=10.5, r=0.06, g=0.09, b=0.16)
    y -= 13
    draw_text(45, y, "Government Engineering College Rajkot {GTU}", font="F1", size=9.5, r=0.3, g=0.35, b=0.4)

    # Relevant Subjects
    y -= 14
    draw_text(45, y, "RELEVANT SUBJECTS", font="F2", size=11, r=0.06, g=0.09, b=0.16)
    y -= 3
    draw_line(45, y, width - 45, y, width=0.8, r=0.8, g=0.83, b=0.88)
    
    y -= 14
    subjects = [
        ("Power System - I", "Electrical Machines - II"),
        ("Switchgear & Protection", "AC Machine Design"),
        ("Electrical Machines - I", "Power Electronics")
    ]
    for col1, col2 in subjects:
        draw_text(55, y, f"*  {col1}", font="F1", size=9.2, r=0.2, g=0.25, b=0.3)
        draw_text(290, y, f"*  {col2}", font="F1", size=9.2, r=0.2, g=0.25, b=0.3)
        y -= 13

    # Skills
    y -= 8
    draw_text(45, y, "SKILLS & COMPETENCIES", font="F2", size=11, r=0.06, g=0.09, b=0.16)
    y -= 3
    draw_line(45, y, width - 45, y, width=0.8, r=0.8, g=0.83, b=0.88)
    
    y -= 14
    skills = [
        ("Engineering Skills:", "CNC Machine Operations, MS Excel, Technical Documentation, Troubleshooting"),
        ("Specialties & Media:", "Video Editing, Graphic Design, Photo Editing, Digital Content Creation"),
        ("Soft Skills:", "Communication, Time Management, Creativity, Collaboration, Teamwork"),
        ("Languages:", "English, Hindi, Gujarati")
    ]
    for label, text in skills:
        draw_text(45, y, label, font="F2", size=9.2, r=0.06, g=0.09, b=0.16)
        draw_text(160, y, text, font="F1", size=9.2, r=0.2, g=0.25, b=0.3)
        y -= 13.5

    # Achievements
    y -= 8
    draw_text(45, y, "ACHIEVEMENTS", font="F2", size=11, r=0.06, g=0.09, b=0.16)
    y -= 3
    draw_line(45, y, width - 45, y, width=0.8, r=0.8, g=0.83, b=0.88)
    
    y -= 14
    achievements = [
        "Completed internship at a CNC manufacturing company, gaining practical industrial experience.",
        "Developed skills in CNC operations, video editing, graphic design, and digital content creation",
        "through hands-on projects and continuous learning."
    ]
    draw_text(48, y, "*", font="F2", size=9, r=0.01, g=0.52, b=0.78)
    draw_text(58, y, achievements[0], font="F1", size=9.2, r=0.2, g=0.25, b=0.3)
    y -= 13.5
    draw_text(48, y, "*", font="F2", size=9, r=0.01, g=0.52, b=0.78)
    draw_text(58, y, achievements[1], font="F1", size=9.2, r=0.2, g=0.25, b=0.3)
    y -= 13.5
    draw_text(58, y, achievements[2], font="F1", size=9.2, r=0.2, g=0.25, b=0.3)

    # Compile PDF Objects
    content_stream = "\n".join(stream_lines).encode("latin1")
    
    objects = []
    
    # 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # 2: Pages
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # 3: Page
    objects.append(
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] "
        b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>"
    )
    # 4: Content Stream
    stream_header = f"<< /Length {len(content_stream)} >>\nstream\n".encode("latin1")
    stream_footer = b"\nendstream"
    objects.append(stream_header + content_stream + stream_footer)
    # 5: Font F1 (Helvetica)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
    # 6: Font F2 (Helvetica-Bold)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")

    # Build PDF binary
    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    
    offsets = []
    for i, obj in enumerate(objects):
        offsets.append(len(pdf))
        pdf.extend(f"{i+1} 0 obj\n".encode("latin1"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")
        
    startxref = len(pdf)
    pdf.extend(b"xref\n")
    pdf.extend(f"0 {len(objects) + 1}\n".encode("latin1"))
    pdf.extend(b"0000000000 65535 f \n")
    for off in offsets:
        pdf.extend(f"{off:010d} 00000 n \n".encode("latin1"))
        
    pdf.extend(b"trailer\n")
    pdf.extend(f"<< /Size {len(objects) + 1} /Root 1 0 R >>\n".encode("latin1"))
    pdf.extend(b"startxref\n")
    pdf.extend(f"{startxref}\n".encode("latin1"))
    pdf.extend(b"%%EOF\n")

    with open(filename, "wb") as f:
        f.write(pdf)
    print(f"Successfully generated {filename} ({len(pdf)} bytes)")

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "Makwana_Krrish_Resume.pdf"
    generate_pdf(out)
