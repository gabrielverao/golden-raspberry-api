# Golden Raspberry Awards API 🎬

REST API construída com [NestJS](https://nestjs.com/) para processar os vencedores do Golden Raspberry Awards e identificar os produtores com o menor e maior intervalo entre vitórias na categoria de **Pior Filme**.

---

## 🚀 Tecnologias utilizadas

- Node.js v18+
- NestJS
- TypeORM
- SQLite (em memória)
- CSV Parser
- Swagger
- Jest + Supertest (para testes de integração)
- Arquitetura baseada em **DDD**
---

## 📦 Instalação

```bash
git clone https://github.com/gabrielverao/golden-raspberry-api
cd golden-raspberry-api

yarn install
```

---

## ▶️ Executando a aplicação

```bash
yarn start:dev
```

> A API será iniciada em: http://localhost:3000

---

## 📄 Documentação Swagger

Disponível em:
http://localhost:3000/swagger

---

## 📂 Endpoint principal

### `GET /producers/intervals`

Retorna os produtores com:

- Menor intervalo entre vitórias consecutivas
- Maior intervalo entre vitórias consecutivas

#### 💡 Exemplo de resposta:
```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Bo Derek",
      "interval": 14,
      "previousWin": 1984,
      "followingWin": 1998
    }
  ]
}
```

---

## 🧪 Executando os Testes de integração

```bash
test:e2e
```

---


