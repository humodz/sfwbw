export function isSuccessResponse<T>(response: any): response is { data: T } {
  return 'data' in response;
}

export function isErrorResponse(response: any): response is { error: any } {
  return 'error' in response;
}
