## Git
Workflow is pull → work → add → commit → pull → push

## Markdown
Github's guide can be found [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Environments
Production is the server, deploy using a shell script, develop and test locally.

## Server
[http://52.45.233.47/](http://52.45.233.47/)
ssh -i /home/lars/Documents/College/Term4S23/cs260/260awskeypairname.pem ubuntu@52.45.233.47

### Certificates
Needed for HTTPS. Let's Encrypt generates certificates. Caddy interfaces with that on my behalf. 