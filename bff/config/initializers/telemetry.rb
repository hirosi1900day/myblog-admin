require 'opentelemetry/sdk'
require 'opentelemetry/exporter/jaeger'
require 'opentelemetry/instrumentation/all'
require 'opentelemetry-instrumentation-rails'

ENV['OTEL_TRACES_EXPORTER'] = 'jaeger'

ENV['OTEL_SERVICE_NAME'] = 'jaeger-example'
ENV['OTEL_SERVICE_VERSION'] = '0.6.0'


# The exporter will connect to localhost:6831 by default. To change:
# ENV['OTEL_EXPORTER_JAEGER_AGENT_HOST'] = '127.0.0.1'
# ENV['OTEL_EXPORTER_JAEGER_ENDPOINT'] = 'http://127.0.0.1:14268/api/traces'
# ENV['OTEL_EXPORTER_JAEGER_AGENT_PORT'] = 12345

exporter = OpenTelemetry::Exporter::Jaeger::CollectorExporter.new(
  endpoint: 'http://jaeger:14268/api/traces'
)
# exporter = OpenTelemetry::Exporter::Jaeger::AgentExporter.new(
#   host: '127.0.0.1', port: 6831, max_packet_size: 65_000)
processor = OpenTelemetry::SDK::Trace::Export::BatchSpanProcessor.new(exporter)

OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    processor
  )
  c.service_name = 'toy-app2'
  # c.service_version = '0.1.0'

  c.use_all
  # c.use 'OpenTelemetry::Instrumentation::Rails'
  # c.use 'OpenTelemetry::Instrumentation::Mysql2'
end
