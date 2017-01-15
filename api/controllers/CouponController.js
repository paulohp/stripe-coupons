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
    stripe.coupons.create(req.body, (err, coupon) => {
      if(err) return res.status(500).send(err)
      return res.json({
       coupon
      });
    });
  },


  /**
   * `CouponController.delete()`
   */
  delete: function (req, res) {
    stripe.coupons.del(req.params.id)
      .then(() => {
        return res.json({
          message: 'Successfully Deleted!'
        });
    })
  },


  /**
   * `CouponController.list()`
   */
  list: function (req, res) {
    stripe.coupons.list(
      {limit: 100},
      function(err, coupons) {
        return res.json({
          coupons: coupons.data
        });
      }
    );
  }
};

