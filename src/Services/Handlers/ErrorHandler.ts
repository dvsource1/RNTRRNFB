export namespace ErrorHandler {
  export const HandleAuthError: (error: any) => void = (error: any): void => {
    console.error(error);
  };
}
