var expect = require('chai').expect
var UrlAssembler = require('../')

describe('an instance with no baseUrl', function () {
  var myUrl;
  beforeEach(function () {
    myUrl = UrlAssembler();
  });

  describe('given a template with no parameters', function () {
    beforeEach(function () {
      myUrl.template('/hello');
    });
    describe('.toString()', function () {
      it('returns the template', function () {
        expect(myUrl.toString()).to.equal('/hello');
      });
    })

    describe('.prefix()', function () {
      it('adds a prefix to the result of toString()', function () {
        expect(myUrl.prefix('/coucou').toString()).to.equal('/coucou/hello');
      });
    });

    describe('.param()', function () {
      it('adds the parameter as a query parameter', function () {
        expect(myUrl.param('a', 'bc').toString()).to.equal('/hello?a=bc');
      });
    });

    describe('.query()', function () {
      it('add the parameter as a query parameter', function () {
        expect(myUrl.query('param', 12345).toString()).to.equal('/hello?param=12345');
      })
    })
  });

  describe('given a template with a simple parameter', function () {
    beforeEach(function () {
      myUrl = UrlAssembler('/path/:myparam');
    });
    describe('.param()', function () {
      it('replaces the parameter in the template', function () {
        expect(myUrl.param('myparam', 'hello').toString()).to.equal('/path/hello');
      })
    });

    describe('.segment()', function () {
      beforeEach(function () {
        myUrl.param('myparam', 'hello');
        myUrl.segment('/another/:parameter');
      })
      it('adds the given parametrized segment at the end of the path', function () {
        expect(myUrl.param('parameter', 8000).toString()).to.equal('/path/hello/another/8000');
      });
    });
  });
});
