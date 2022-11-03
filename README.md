# puck
技术栈：nest.js、typescript、grpahql、prisma、PostSql、redis

是一个使用nest.js框架的后端服务。调用推荐系统的接口、elasticSearch提供的接口，为前端提供graphql接口。使用redis + cookie session存储用户登录信息，通过Guard + session cookie作为用户的登录判断。使用jwt为前端提供不方便直接使用cookie的登录凭证。
