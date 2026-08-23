self.addEventListener('push', event => {

    let data = {};

    try {
        data = event.data
            ? event.data.json()
            : {};
    } catch (error) {
        console.error(
            'Unable to read push data:',
            error
        );
    }


    const title =
        data.title ||
        'New FasFoods Order';


    const options = {

        body:
            data.body ||
            'A new order has been received.',

        icon:
            data.icon ||
            '/assets/images/icon-192.png',

        badge:
            data.badge ||
            '/assets/images/icon-192.png',

        tag:
            data.tag ||
            'fasfoods-new-order',

        renotify: true,

        data: {
            url:
                data.url ||
                '/?open=shop-orders'
        }
    };


    event.waitUntil(
        self.registration.showNotification(
            title,
            options
        )
    );
});


self.addEventListener(
    'notificationclick',
    event => {

        event.notification.close();

        const targetUrl =
            event.notification.data?.url ||
            '/?open=shop-orders';


        event.waitUntil(

            clients
                .matchAll({
                    type: 'window',
                    includeUncontrolled: true
                })
                .then(clientList => {

                    for (
                        const client
                        of clientList
                    ) {

                        if ('focus' in client) {

                            client.navigate(
                                targetUrl
                            );

                            return client.focus();
                        }
                    }


                    if (
                        clients.openWindow
                    ) {
                        return clients.openWindow(
                            targetUrl
                        );
                    }
                })
        );
    }
);