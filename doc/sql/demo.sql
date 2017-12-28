INSERT INTO t_dataset (
    c_name, c_creator, c_create_time
)VALUES(
    'user', '1', NOW()
);

INSERT INTO t_dataset_data (
    c_dataset_id, c_state, c_data, c_creator, c_create_time
)VALUES(
    1, 'success', '[{"id":1,"name":"Admin"},{"id":2,"name":"测试用户1"}]', 1, NOW()
);
