up:
	docker compose -f docker-compose.yml up --no-deps --build -d

CERTBOT_CMD = sudo certbot certonly --standalone --non-interactive --force-renewal -d
CERT_PATH = /etc/letsencrypt/live
NGINX_CERTS_PATH = ./nginx/certs

all: certs

certs: replicate_cert

replicate_cert:
	$(CERTBOT_CMD) replicate.conductscience.com
	sudo cp $(CERT_PATH)/replicate.conductscience.com/fullchain.pem $(NGINX_CERTS_PATH)/replicate.fullchain.pem
	sudo cp $(CERT_PATH)/replicate.conductscience.com/privkey.pem $(NGINX_CERTS_PATH)/replicate.privkey.pem