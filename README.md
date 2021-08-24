# Hi Nest!

Learning how to build Enterprise NodeJS applications using NestJS

- 노마드코더 강의 : [NestJS로 API 만들기](https://nomadcoders.co/nestjs-fundamentals)

## 0. Project Setup

- @nestjs/cli 설치

  ```zsh
  npm install -g @nestjs/cli
  ```

- project 생성

  ```zsh
  nest new hi-nest    # project name: hi-nest
  ```

- run

  ```zsh
  npm run start:dev
  ```

- http://localhost:3000

## 1. Architecture Of NestJS

- NestJS는 TypeScript를 지원함. TypeScript는 정적 타입을 통해 컴파일 타임에 타입 검사를 해서 코드의 안정성을 향상시킴
- NestJS는 아키텍처의 정의를 프레임워크에서 제공하기 때문에 개발자들의 아키텍처가 통일되고 서로가 작성한 코드의 구조를 쉽게 파악할 수 있음
- 파일 구조 : main.ts -> app.module.ts (AppModule) -> app.controller.ts -> app.service.ts
- NestJS는 main.ts 파일을 가지며, 무조건 이 이름이여야만 한다. AppModule로 app을 생성함
- AppModule : 우리가 하는 모든 것을 Import한다. 모든 Module의 대장 (main.ts에서 app을 구성하는데 사용되고, listen으로 실행됨)
  - Module : 모듈은 비슷한 기능을 하는 코드들의 모음이다. service와 controller를 한 모듈로 묶어 하나의 덩어리를 형성. django로 치면 일종의 '앱'. photo 앱, user 앱 등
- 컨트롤러 : 기본적으로 URL을 가져오고 함수를 실행시킴. node.js에서 express의 라우터와 비슷한 존재. 즉 URL을 가져와 함수를 매핑함
- 서비스 : 컨트롤러는 URL을 가져오는 역할 뿐 비지니스 로직은 모두 서비스에 구현함. 서비스는 일반적으로 실제의 function을 가지는 부분
- 데코레이터 : 클래스에 함수 기능을 추가 할 수 있음. 데코레이터는 꾸며주는 함수나 클래스와 반드시 붙어있어야 함

- Folders

  ```
  ├── README.md
  ├── dist    // Source build
  ├── nest-cli.json
  ├── node_modules    // node packages
  ├── package-lock.json
  ├── package.json
  ├── src
  │   ├── app.controller.ts    // Nest Controllers
  │   ├── app.module.ts    // AppModule and Moudles
  │   ├── app.service.ts    // Nest Services
  │   └── main.ts    // Mandatory file name
  ├── test
  │   ├── app.e2e-spec.ts
  │   └── jest-e2e.json
  ├── tsconfig.build.json
  └── tsconfig.json
  ```

## 2. REST API
