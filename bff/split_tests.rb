# split_tests.rb
all_tests = Dir["spec/**/*_spec.rb"]
job_count = ENV["JOB_COUNT"].to_i
job_index = ENV["JOB_INDEX"].to_i

split_tests = all_tests.each_slice((all_tests.size / job_count.to_f).ceil).to_a
split_tests[job_index] || []
