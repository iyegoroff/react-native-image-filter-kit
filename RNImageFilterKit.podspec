require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name             = 'RNImageFilterKit'
  s.version          = package['version']
  s.summary          = package['description']
  s.license          = package['license']
  s.homepage         = 'https://github.com/iyegoroff/react-native-image-filter-kit'
  s.authors          = 'iyegoroff'
  s.source           = { :git => 'https://github.com/iyegoroff/react-native-image-filter-kit.git', :tag => s.version }
  s.source_files     = 'ios/**/*.{h,m}'
  s.requires_arc     = true
  s.platforms        = { :ios => "9.0", :tvos => "9.2" }
  s.dependency         'React'  
end
