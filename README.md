# Warzone API

To run install docker first and then from the project directory, run

```
docker-compose up
```

## Routes

Routes have only one query parameter, `user`. (`user` value has to be url encoded)

| Route                          | Description                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `GET: /lifetime`               | Get all lifetime stats of an user                                              |
| `GET: /lifetime/stats`         | Get all BR style game stats                                                    |
| `GET: /lifetime/stats/:type`   | Get stats of type `br` for **Battle Royale** and `br_dmz` for **Plunder**      |
| `GET: /lifetime/weapons`       | Get usage details for all weapons                                              |
| `GET: /lifetime/weapons/:type` | Get usage details for a particular type of weapon. See below for weapon types. |
| `GET: Weekly`                  | Get all weekly stats.                                                          |
