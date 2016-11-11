function existy(x) {
    return x != null;
}

function truthy(x) {
    return (x !== false) && existy(x);
}

function cat() {
    var head = _.first(arguments);

    if (existy(head)) {
        return head.concat.apply(head, _.rest(arguments));
    } else {
        return [];
    }
}

function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

function rename(obj, newNames) {
    return _.reduce(newNames, function(o, nu, old) {
        if (_.has(obj, old)) {
            o[nu] = obj[old];
            return o;
        } else {
            return o;
        }
    }, _.omit.apply(null, construct(obj, _.keys(newNames))));
}

function as(table, newNames) {
    return _.map(table, function(obj) {
        return rename(obj, newNames);
    });
}

function project(table, keys) {
    return _.map(table, function(obj) {
        return _.pick.apply(null, construct(obj, keys));
    });
}

function restrict(table, pred) {
    return _.reduce(table, function(newTable, obj) {
        if (truthy(pred(obj))) {
            return newTable;
        } else {
            return _.without(newTable, obj);
        }
    }, table);
}

var library = [
    {title: "SICP", isbn: "0262010771", ed: 1},
    {title: "SICP", isbn: "0262510871", ed: 2},
    {title: "Joy of Clojure", isbn: "1935182641", ed:1}
];

console.log(restrict(project(as(library, {ed: 'edition'}), ['title', 'isbn', 'edition']), function(book) {
    return book.edition > 1;
}));