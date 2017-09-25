/**
 * @see: https://github.com/requirejs/requirejs/issues/1554#issuecomment-226269905
 */
define(['moment', 'config'], function (moment, config) {
    moment.locale(config.momentLocale || 'en');
    window.moment = moment;
    return moment;
});