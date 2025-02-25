import json


def parse_api_error(error: Exception) -> str:
  """Helper method to parse API errors and extract meaningful messages.
  Checks if error has a body attribute and if it is a JSON object.
  If it is, it will return the message from the JSON object.
  If it is not, it will return the original error message.

  Args:
      error: The exception to parse

  Returns:
      A formatted error message string
  """
  try:
      error_body = getattr(error, 'body', None)
      if error_body is None:
          return str(error)

      error_str = str(error_body)
      try:
          error_data = json.loads(error_str)
          if isinstance(error_data, dict):
              if "message" in error_data:
                  return error_data['message']
              return json.dumps(error_data)
      except json.JSONDecodeError:
          pass

      return error_str
  except Exception:
      # If anything goes wrong in parsing, return the original error
      return str(error)
