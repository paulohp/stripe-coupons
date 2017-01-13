var stripe = require('stripe')('sk_test_gvvoWW1EXO2aQiFKnEwIoy3U');
/**
 * CouponController
 *
 * @description :: Server-side logic for managing coupons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `CouponController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },


  /**
   * `CouponController.delete()`
   */
  delete: function (req, res) {
    stripe.coupons.del(req.params.id)
      .then(() => {
        return res.json({
          todo: 'delete() is not implemented yet!'
        });
    })
  },


  /**
   * `CouponController.list()`
   */
  list: function (req, res) {
    stripe.coupons.list(
      {},
      function(err, coupons) {
        return res.json({
          coupons: coupons.data
        });
      }
    );
  }
};

