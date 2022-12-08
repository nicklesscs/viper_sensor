#!/usr/bin/env python
import rospy

import math
import tf2_ros
# from tf2_msgs import TFMessage

# def callback(data):
#     rospy.loginfo("Received Data: %s",data.TransformStamped)


# def listener():
    # rospy.init_node('tf_listener', anonymous= True)
    # rospy.Subscriber('tf_polhemus',TransformStamped,callback)


if __name__ == '__main__':
    rospy.init_node('tf_listener', anonymous=True)

    tfBuffer = tf2_ros.Buffer()
    listener = tf2_ros.TransformListener(tfBuffer)

    target_frame = 'polhemus_station_0'
    source_frame = 'polhemus_base_0'
    while not rospy.is_shutdown():
        try:
            trans = tfBuffer.lookup_transform(target_frame, source_frame, rospy.Time(0), rospy.Duration(0.1))

            print(trans.transform.translation.x, trans.transform.translation.y, trans.transform.translation.z,
                  trans.transform.rotation.x, trans.transform.rotation.y, trans.transform.rotation.z,
                  trans.transform.rotation.w)
        except (tf2_ros.LookupException, tf2_ros.ConnectivityException, tf2_ros.ExtrapolationException):
            rospy.loginfo('Unable to find transformation :p')
            continue

        # rate.sleep()

