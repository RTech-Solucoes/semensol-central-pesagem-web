from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route("/semensol/api", methods=["POST"])
def deploy():
    data = request.get_json()

    if not data:
        return jsonify(success=False, error="Body JSON é obrigatório"), 400

    image = data.get("image")
    container = data.get("container")
    branch = data.get("branch")

    if not image:
        return jsonify(success=False, error="Campo 'image' é obrigatório"), 400
    if not branch:
        return jsonify(success=False, error="Campo 'branch' é obrigatório"), 400

    # definir porta de acordo com a branch
    if branch == "develop":
        host_port = 5001
    elif branch == "main":
        host_port = 5000
    else:
        return jsonify(success=False, error=f"Branch '{branch}' não é permitida"), 400

    try:
        # parar e remover container antigo (se existir)
        subprocess.run(
            f"docker ps -q --filter 'name={container}' | grep -q . && docker stop {container} && docker rm {container} || true",
            shell=True, check=True
        )

        # autenticar com a AWS
        subprocess.run(
            f"aws ecr get-login-password | docker login --username AWS --password-stdin 916963275016.dkr.ecr.us-west-2.amazonaws.com",
            shell=True, check=True
        )

        # rodar novo container
        subprocess.run(
            f"docker run -d -p {host_port}:5000 --restart always --name {container} {image}",
            shell=True, check=True
        )

        # limpeza de imagens antigas
        subprocess.run("docker system prune -af", shell=True, check=True)

        return jsonify(
            success=True,
            message="Deploy realizado com sucesso",
            image=image,
            container=container
        ), 200

    except subprocess.CalledProcessError as e:
        return jsonify(
            success=False,
            error="Erro ao executar comando no servidor",
            details=str(e)
        ), 500

@app.route("/semensol/web", methods=["POST"])
def deploy():
    data = request.get_json()

    if not data:
        return jsonify(success=False, error="Body JSON é obrigatório"), 400

    image = data.get("image")
    container = data.get("container")
    branch = data.get("branch")

    if not image:
        return jsonify(success=False, error="Campo 'image' é obrigatório"), 400
    if not branch:
        return jsonify(success=False, error="Campo 'branch' é obrigatório"), 400

    # definir porta de acordo com a branch
    if branch == "develop":
        host_port = 3001
    elif branch == "main":
        host_port = 3000
    else:
        return jsonify(success=False, error=f"Branch '{branch}' não é permitida"), 400

    try:
        # parar e remover container antigo (se existir)
        subprocess.run(
            f"docker ps -q --filter 'name={container}' | grep -q . && docker stop {container} && docker rm {container} || true",
            shell=True, check=True
        )

        # autenticar com a AWS
        subprocess.run(
            f"aws ecr get-login-password | docker login --username AWS --password-stdin 916963275016.dkr.ecr.us-west-2.amazonaws.com",
            shell=True, check=True
        )

        # rodar novo container
        subprocess.run(
            f"docker run -d -p {host_port}:3000 --restart always --name {container} {image}",
            shell=True, check=True
        )

        # limpeza de imagens antigas
        subprocess.run("docker system prune -af", shell=True, check=True)

        return jsonify(
            success=True,
            message="Deploy realizado com sucesso",
            image=image,
            container=container
        ), 200

    except subprocess.CalledProcessError as e:
        return jsonify(
            success=False,
            error="Erro ao executar comando no servidor",
            details=str(e)
        ), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8090)