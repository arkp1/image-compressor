from flask import Flask, request, send_file
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    img = Image.open(file)
    quality = int(request.form.get('quality', default=50))
    img.load()  # Verify that the file is an image
    
    output = io.BytesIO()
    img.save(output, format="JPEG", quality=quality) 
    output.seek(0)

    return send_file(output, as_attachment=True, download_name="compressed.jpg", mimetype="image/jpeg")

if __name__ == '__main__':
    app.run(debug=True)
