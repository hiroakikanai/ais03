# ais_dialogue

---

## Requirements

* node (>= 6.6.0)
* gulp (~> 3.9)
* typescript (~> 2.1)
* yarn (>= 0.18.1)

## Setup

```
npm install -g gulp
yarn install
```

## How to Build

```
gulp build
```

or

```
gulp watch
```

## Start Local Server

```
gulp web
```

## Mock Server

### How to Use

#### Add API

`/mock_data`以下にAPI名でjsonを置く。jsonの中身はそのままレスポンスとなる

#### Use API

`http://localhost:8000/api/{jsonのファイル名}`でアクセスする
