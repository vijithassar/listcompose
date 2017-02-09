var listcompose,
    self;

self = function(input) {
    return input;
}

listcompose = function(array, process) {
    var composed,
        all_functions;
    all_functions = array.every(function(item) {
        return typeof item === 'function';
    });
    if (! all_functions) {
        throw new Error('first argument to listcompose must be an array of functions');
    }
    if (! process) {
        process = self;
    }
    composed = function(input) {
        return array.reduce(function(previous, current, index) {
            return process(current(previous), index);
        }, input);
    };
    return composed;
};

export { listcompose };