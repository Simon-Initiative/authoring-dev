# Notes

## General

VSCode docker image is extended from codercom/code-server:v2

### Update VSCode Base
```
docker pull codercom/code-server:v2
docker-compose -f docker-compose.code.yml build
docker-compose -f docker-compose.code.yml up -d && docker-compose -f docker-compose.code.yml logs -f
```