def test_order_price_cannot_be_faked_by_client(client, admin_client, sample_product_payload):
    """Регрессионный тест на уязвимость: раньше сервер верил цене,
    присланной клиентом. Теперь сервер должен сам подставлять
    настоящую цену товара из базы, игнорируя присланную.
    """
    created_product = admin_client.post("/product", json=sample_product_payload).json()
    product_id = created_product["id"]
    real_price = created_product["price"]  # 10000, см. conftest.py

    fake_price = 1  # злоумышленник пытается заказать за 1 тенге

    response = client.post("/order", json={
        "product_id": product_id,
        "watch": "Test Watch",
        "customer": "Покупатель",
        "price": fake_price,
    })
    assert response.status_code == 200

    created_order = response.json()
    assert created_order["price"] == real_price
    assert created_order["price"] != fake_price


def test_order_without_product_id_still_works(client):
    """Обратная совместимость: если product_id не передали
    (старый фронтенд или ручной заказ), заказ всё равно создаётся.
    """
    response = client.post("/order", json={
        "watch": "Кастомный заказ",
        "customer": "Покупатель",
        "price": 5000,
    })
    assert response.status_code == 200