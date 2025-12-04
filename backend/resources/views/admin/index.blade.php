@extends('admin.layouts.app')

@section('title')
    Dashboard
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div>
                        <h3 class="mt-2">Dashboar</h3>
                        <hr>
                    </div>
                    <div class="card-body">
                        <div class="row mb-2">
                            <div class="col-md-6 mb-2">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <span>
                                                Today's Orders
                                            </span>
                                            <span>
                                                {{ $todayOrders->count() }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="card-body text-center">
                                        <strong>
                                            ${{ $todayOrders->sum('total') }}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <span>
                                                Yesterday's Orders
                                            </span>
                                            <span>
                                                {{ $yesterdayOrders->count() }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="card-body text-center">
                                        <strong>
                                            ${{ $yesterdayOrders->sum('total') }}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <span>
                                                This Month Orders
                                            </span>
                                            <span>
                                                {{ $monthOrders->count() }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="card-body text-center">
                                        <strong>
                                            ${{ $monthOrders->sum('total') }}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <span>
                                                This Year Orders
                                            </span>
                                            <span>
                                                {{ $yearOrders->count() }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="card-body text-center">
                                        <strong>
                                            ${{ $yearOrders->sum('total') }}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
@endsection
