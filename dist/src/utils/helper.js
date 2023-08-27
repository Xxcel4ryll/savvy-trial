"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate_pagination_data = exports.calculate_pagination = exports.calculate_query_params = void 0;
const sequelize_1 = require("sequelize");
const calculate_query_params = (query, query_condition) => {
    var _a, _b;
    const search_by = (_a = query.searchBy) !== null && _a !== void 0 ? _a : null;
    const search_param = (_b = query.searchParam) !== null && _b !== void 0 ? _b : null;
    const condition = query_condition ? Object.assign({}, query_condition) : {};
    if (search_param != null) {
        condition[search_by] = { [sequelize_1.Op.like]: `${search_param}` };
    }
    const query_page = query.page ? Number.parseInt(query.page) : 0;
    const query_size = query.size ? Number.parseInt(query.size) : 0;
    let limit_query, offset_query;
    if (query_page || query_size) {
        const { limit, offset } = (0, exports.calculate_pagination)(query_page, query_size);
        limit_query = limit;
        offset_query = offset;
    }
    else {
        limit_query = null;
        offset_query = 0;
    }
    return Object.assign({ limit_query, offset_query, query_page, condition }, query);
};
exports.calculate_query_params = calculate_query_params;
const calculate_pagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return {
        limit,
        offset,
    };
};
exports.calculate_pagination = calculate_pagination;
const calculate_pagination_data = (data, page, limit) => {
    const { count: total_items, rows: data_response } = data;
    const current_page = page ? +page : 0;
    const total_pages = Math.ceil(total_items / limit);
    return {
        total_items,
        data_response,
        total_pages,
        current_page,
    };
};
exports.calculate_pagination_data = calculate_pagination_data;
//# sourceMappingURL=helper.js.map