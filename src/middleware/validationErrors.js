module.exports = async function handleValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.log('ERRRR____________', err)
    if (err.name.indexOf('Sequelize') === -1) throw err;

    ctx.status = 400;

    const errors = {};

    for (const field of Object.keys(err.errors)) {
      errors[field] = err.errors[field].message;
    }

    ctx.body = {
      errors: errors,
    };
  }
};
