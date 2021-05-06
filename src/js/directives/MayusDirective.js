app.directive('uppercaseOnly', [
    // Dependencies

    // Directive
    function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {

                //This part of the code manipulates the model
                ngModel.$parsers.push(function(input) {
                    return input ? input.toUpperCase() : "";
                });

                //This part of the code manipulates the viewvalue of the element
                element.css("text-transform","uppercase");
            }
        };
    }
]);