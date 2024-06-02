# split_tests.rb
all_tests = Dir["spec/**/*_spec.rb"]
job_count = ARGV[0].to_i
job_index = ARGV[1].to_i

puts all_tests
puts job_count
puts job_index
puts "Splitting tests into #{job_count} jobs, running job #{job_index}"

split_tests = all_tests.each_slice((all_tests.size / job_count.to_f).ceil).to_a
split_tests[job_index] || []
