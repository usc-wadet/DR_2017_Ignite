/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.ignite.compute;

import org.apache.ignite.IgniteException;
import org.jetbrains.annotations.Nullable;

/**
 * This exception indicates that task execution timed out. It is thrown from
 * {@link ComputeTaskFuture#get()} method.
 */
public class ComputeTaskTimeoutException extends IgniteException {
    /** */
    private static final long serialVersionUID = 0L;

    /**
     * Creates task timeout exception with given task execution ID and
     * error message.
     *
     * @param msg Error message.
     */
    public ComputeTaskTimeoutException(String msg) {
        super(msg);
    }

    /**
     * Creates new task timeout exception given throwable as a cause and
     * source of error message.
     *
     * @param cause Non-null throwable cause.
     */
    public ComputeTaskTimeoutException(Throwable cause) {
        this(cause.getMessage(), cause);
    }

    /**
     * Creates task timeout exception with given task execution ID,
     * error message and optional nested exception.
     *
     * @param msg Error message.
     * @param cause Optional nested exception (can be {@code null}).
     */
    public ComputeTaskTimeoutException(String msg, @Nullable Throwable cause) {
        super(msg, cause);
    }
}