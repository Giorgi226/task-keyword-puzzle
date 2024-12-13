## Project setup

```bash
$ npm install
```

## chems mowyobilobaze dainstalirebuli maqvs node js version (Node.js v22.12.0)

## chems mowyobilobaze dainstalirebuli maqvs nestjs version (10.4.8)

## package managershi proeqtis instalaciis dros avirchie npm

## chems mowyobilobaze dainstalirebuli maqvs Docker versiit (Docker version 27.3.1, build ce12230)

# Docker gadmovwere da instalaciis dros avirchie wsl rac iyo rekomendirebuli(am dros damchirda leptopidan ufloba Virtual is romelic boot meniudan gavxade enable), proeqtidan nebismieri brdzanebis gashvebamde rac exeba dockers, unda gaixsnas Docker desktop da gaaqtiurdes docker engine

```bash
$ docker ps # am brdzanebit itesteba gashvebulia tu ara da aseve gvaqvs tu ara konteineri
```

# shemdeg shevqmeni docker-compose.yml sadac aris configuracia dockeris conteineris

```bash
$ docker compose up dev-db -d # shemdeg am brdzanebit iqmneba ukve conteineri dockershi (-d backgraound istvis)

$ docker ps # zemot aghnishnuli am brdzanebit ukve gamochndeba sheqmnili conteineri

$ docker logs # am brdzanebit aseve sheidzleba conteineris shemowmeba aris tu ara mzad (database system is ready to accsept connections) boloshi es aris am brdzanebis dadebiti pasuxi

## Additional command for docker
## simartivistvis shevqmeni axali brdzaneba romelic ushvebs $ docker compose rm dev-db -s -f -v, $docker compose up dev-db -d ertdroulad

$ "db:dev:restart" # am brdzanebis shemdeg unda gaeshvas aseve (npx prisma migrate dev) romelic qvemotac maqvs aghnishnuli!

$ npx prisma migrate dev

```

## shemdeg vainstalireb prismas shemdegi brdzanebebit

```bash
$ npm i -D prisma # vainstalireb prismas -D developmentistvis

$ npm i @prisma/client # shemdeg am brdzanebit vainstalireb @prisma/client s

$ npx prisma init # shemdeg am brdzanebit vushveb prismas romelic qmnis ukve ramdenime fails, ert erti aris .env SADAC GAWERILIA ENV CVLADEBI! (.env failshi is tviton qmnis cvlad DATABASE_URL sadac unda chaiweros chems mier mowvdili DATABASE_URL) es brdzaneba aseve qmnis folders prisma sadac tavidan aris (schema.prisma) shemdeg ukve migraciebic.

#.schemas dagenerirebistvis
$ npx prisma generate # am brdzanebis mere wesit mtel proeqtshi unda gamochdens schema.prisma shi gawerili modelebi

# migraciistvis
$ npx prisma migrate deploy

# bazis sanaxavad localhostshi
$ npx prisma studio
```

## dainstalirebuli maqvs aseve class validator da class transformer brdznabit

```bash

$ npm install class-validator class-transformer

```

## parolis daheshvistvis dainstalirebuli maqvs argon2

```bash
$ npm install argon2

```

## advilad configuraciistvis proeqtshi dainstalirebuli maqvs config

```bash
$ npm install @nestjs/config

```

## Oauth 2.0 isa da Jwt istvis dainstalirebulia shemdegi brdzanebebi

```bash
$ npm install @nestjs/passport passport

$ npm install @nestjs/jwt passport-jwt

$ npm install -D @types/passport-jwt

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## ENV cvladebi aris .env failshi

# sul gvaqvs otxi cvladi

##monacemta bazis tipis, postgres user:paroli @ amis shemdeg porti romelic docker-compose-yml shi maqvs mititebuli

# DATABASE_URL=""

# Ori cvladi google apistvis da search enginestvis am cvladebs viyeneb keyword ze dagenirebuli suratebis linkis funqcionalistvis

##googlis api-key

# GOOGLE_API_KEY=

##search engine id

# GOOGLE_CX=

##random secreti romelsac iyenebs jwt dashifristvis

# JWT_SECRET = ""

## Swagger

# apze xelmiswawvdomia OpenApi specipikacia Swagger dainstalirebulia qvemot mocemuli brdzanebit da gansazghvrulia main.ts shi

```bash
$ npm install @nestjs/swagger swagger-ui-express

```

# proeqtis gashvebis shemdeg Swaggeris misamarti: http://localhost:3333/api
