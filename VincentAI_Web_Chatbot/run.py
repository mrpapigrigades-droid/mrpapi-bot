import platform
from app import app

if platform.system() == "Windows":
    from waitress import serve
    print("Running on Windows...")
    serve(app, host="0.0.0.0", port=5000)
else:
    import os
    port = int(os.environ.get("PORT", 5000))
    print(f"Running on Render/Linux on port {port}...")
    app.run(host="0.0.0.0", port=port)