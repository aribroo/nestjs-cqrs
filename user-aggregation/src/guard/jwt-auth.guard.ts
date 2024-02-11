// import {
//   CanActivate,
//   ExecutionContext,
//   Inject,
//   Logger,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { catchError, Observable, tap } from 'rxjs';
// // import { AUTH_SERVICE } from 'src/common/constants/services';

// export class AuthGuard implements CanActivate {
//   // constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const req = context.switchToHttp().getRequest();

//     return this.client
//       .send(
//         'validate:user',
//         req.headers['authorization']?.split(' ')[1].replace('",', ''),
//       )
//       .pipe(
//         tap((res) => {
//           this.addUser(res, context);
//         }),
//         catchError((e) => {
//           throw new UnauthorizedException();
//         }),
//       );
//   }

//   private addUser(user: any, context: ExecutionContext) {
//     if (user === false) {
//       throw new UnauthorizedException();
//     }
//     if (context.getType() === 'rpc') {
//       context.switchToRpc().getData().user = user;
//     } else if (context.getType() === 'http') {
//       context.switchToHttp().getRequest().user = user;
//     }
//   }
// }
