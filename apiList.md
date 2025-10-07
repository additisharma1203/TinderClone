# DevTinder apis

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- PATCH /profile/edit
- GET /profile/view
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/:status/:userId  // status => ignored/interested
- PoST /request/review/:status/:requestId

userRouter
- GET  /user/connnections
- GET /user/requests
- GET /user/feed  - gets you the profiles of other users on platform



STATUS TYPES :
- ignore , interested , accepted , rejected