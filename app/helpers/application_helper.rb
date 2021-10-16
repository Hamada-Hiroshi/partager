module ApplicationHelper
  def controller_classes
    "#{controller.controller_path.gsub('/', ' ')} #{action_name}"
  end
end
