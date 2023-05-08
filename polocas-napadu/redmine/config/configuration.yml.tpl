production:
  logger_level: :warn
  delivery_method: :smtp
  smtp_settings:
    address: "smtp-relay.gmail.com"
    authentication: :plain
    domain: "smtp-relay.gmail.com"
    password: ${password}
    port: 587
    user_name: ${user_name}
