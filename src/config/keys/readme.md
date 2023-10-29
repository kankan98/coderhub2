## 非对称加密：RS256
- 私钥（private key）：用于发布令牌；
- 公钥（public key）：用于验证令牌；

### 使用openssl来生成一对私钥和公钥
> Windows默认的cmd终端是不能直接使用的，建议直接使用git bash终端;

```bash
openssl

> genrsa -out private.key 2048 // 生成私钥
> rsa -in private.key -pubout -out public.key // 通过私钥生成公钥
```