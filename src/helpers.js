export const listenToTopic = (listenTo, callback) => (topic, message) => 
    topic === listenTo && callback(message.toString())