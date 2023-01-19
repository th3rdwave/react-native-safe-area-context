require 'json'

fabric_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "react-native-safe-area-context"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platforms    = { :ios => "11.0", :tvos => "11.0" }

  s.source       = { :git => "https://github.com/th3rdwave/react-native-safe-area-context.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m,mm}"
  s.exclude_files = "ios/Fabric"

  s.compiler_flags  = folly_compiler_flags

  s.pod_target_xcconfig    = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
  }

  s.dependency "React-Core"
  s.dependency "RCT-Folly"
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"

  if fabric_enabled
    s.subspec "common" do |ss|
      ss.source_files         = "common/cpp/**/*.{cpp,h}"
      ss.header_dir           = "react/renderer/components/safeareacontext"
      ss.pod_target_xcconfig  = { "HEADER_SEARCH_PATHS" => "\"$(PODS_TARGET_SRCROOT)/common/cpp\"" }
    end

    s.subspec "fabric" do |ss|
      ss.dependency "React-Codegen"
      ss.dependency "React-RCTFabric"
      ss.dependency "react-native-safe-area-context/common"
      ss.source_files         = "ios/Fabric/**/*.{h,m,mm}"
      ss.pod_target_xcconfig  = { "HEADER_SEARCH_PATHS" => "\"$(PODS_TARGET_SRCROOT)/common/cpp\"" }
    end
  end
end
