## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## For Docker

## proeqti iyenebs dockers daintalirebulia kompiutershi, gashvebulia lokalurad. gvaqvs docker-compose.yml. sadac gawerilia proeqtistvis sachiro sakitxebi romlis nawilsac shemdeg iyenebs DATABASE_URL

```bash
#conteineris sheqmnistvis
$ docker compose up dev-db -d # -d backgroundistvis

#konteineris washlistvis
$ docker compose rm dev-db -s -f -v

#ukve sheqmnili docker is konteineris gaaktiureba shesadzlebelia Docker Desktopidanc tu magalitad gamovrtet kompiuteri da chartvis shemdeg ar gvinda zemot aghnishnuli brdzanebebis gashveba.
```

## Additional command for docker

## simartivistvis shevqmeni axali brdzaneba romelic ushvebs $ docker compose rm dev-db -s -f -v, $docker compose up dev-db -d ertdroulad

```bash
$ "db:dev:restart"
```

## For Prizma

## proeqti iyenebs prismas da prisma client (romlebic dainstlirebulia npmit) monacemta bazistvis tviton prisma am shemtxvevashi iyenebs PostgreSqls

```bash
# am brdzanebit shevqmeni dainstalirebuli prismis  prisma.schema da sheiqmna .env shi cvladi DATABASE_URL
$ npx prisma init

#.schemas dagenerirebistvis
$ npx prisma generate

# migraciistvis
$ npx prisma migrate deploy

# bazis sanaxavad localhostshi
$ npx prisma studio

```

## .env

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

# apze xelmiswawvdomia OpenApi specipikacia Swagger

# proeqtis gashvebis shemdeg Swaggeris misamarti: http://localhost:3333/api
